# Sanavita SaaS — pacotes e entitlements

Desenho alinhado ao `MENU_CATALOG` (`sanavita_api`) e aos tiers Starter / Pro / Enterprise da proposta comercial.  
**Tenant de cobrança = `Group`.**

> Cópia do canvas *Saas Modulos Planos*. Fonte de verdade para implementação.

## Regra de ouro

```
Acesso = módulo no plano do Group ∩ menu/capability do perfil do usuário
```

OWNER **não** bypassa entitlement comercial — só ACL de staff.

---

## 1. Modelo de dados

Serviço: `src/services/subscription/`

### `subscription_plan`

| Coluna | Tipo | Notas |
|--------|------|--------|
| id | UUID PK | |
| code | varchar unique | `starter` \| `pro` \| `enterprise` |
| name | varchar | Starter, Pro… |
| is_public | bool | visível em self-serve |
| max_clinics | int nullable | null = ilimitado |
| max_users | int nullable | null = ilimitado |
| trial_days | int | default 14 |
| price_cents_month | int nullable | indicativo / Stripe |
| stripe_price_id | varchar nullable | fase 2 |
| active | bool | |

### `subscription_module`

| Coluna | Tipo | Notas |
|--------|------|--------|
| id | UUID PK | |
| code | varchar unique | `core`, `agenda`, `clinical`… |
| name | varchar | |
| menu_keys | JSON | lista de chaves `MENU_CATALOG` |
| feature_flags | JSON | ex.: `{queue_enabled: true}` |
| is_addon | bool | vendável avulso |

### `subscription_plan_module`

| Coluna | Tipo | Notas |
|--------|------|--------|
| plan_id | FK | → subscription_plan |
| module_id | FK | → subscription_module |
| included | bool | true = no plano |

Unique `(plan_id, module_id)`.

### `group_subscription`

| Coluna | Tipo | Notas |
|--------|------|--------|
| id | UUID PK | |
| group_id | FK unique | 1 assinatura por Group |
| plan_id | FK | → subscription_plan |
| status | enum | `trial` \| `active` \| `past_due` \| `canceled` \| `expired` |
| started_at | timestamptz | |
| trial_ends_at | timestamptz nullable | |
| current_period_end | timestamptz nullable | |
| canceled_at | timestamptz nullable | |
| stripe_subscription_id | varchar nullable | fase 2 |
| extra_modules | JSON | add-ons além do plano |
| overrides | JSON | limites custom (Enterprise) |

### Flags existentes

Manter `clinic_feature_flags` (queue, payments, tiss, dunning) como runtime por clínica, mas **sincronizar a partir do entitlement** do Group no provisionamento / upgrade — o cliente não liga módulo não contratado em ClinicModulesSettings.

---

## 2. Catálogo de módulos → menuKeys

| Módulo | Código | Menus / flags | Obs. |
|--------|--------|---------------|------|
| Core | `core` | dashboard, clinics, users, patients, settings | Sempre incluso |
| Agenda | `agenda` | appointments, schedules, reminders, medical_staff_ops | queue via módulo/`queue` flag |
| Clínico | `clinical` | medical_records, prescriptions, certificates, medicines, exams, medical_staff_config | PEP + documentos |
| Financeiro básico | `finance_basic` | dashboard_finance, accounts_payable, accounts_receivable, financial_categories | Pagar / receber |
| Financeiro completo | `finance_full` | billing, doctor_payments, employee_payments, accounting + flags TISS | Inclui finance_basic |
| Suprimentos | `supplies` | inventory, purchases, suppliers | Farmácia / compras |
| Portal paciente | `patient_portal` | `patient_portal` (chave nova) | App isolado |
| BI & Compliance | `bi_compliance` | bi, lgpd | Relatórios + LGPD |

Add-ons: `payments_online`, `dunning` (flags).

---

## 3. Matriz plano × módulo

| Módulo | Starter | Pro | Enterprise |
|--------|---------|-----|------------|
| core | Sim | Sim | Sim |
| agenda (sem queue) | Sim | Sim | Sim |
| queue (fila/senhas) | — | Sim | Sim |
| clinical | Sim | Sim | Sim |
| finance_basic | Sim | Sim | Sim |
| finance_full + TISS | — | Sim | Sim |
| supplies | — | Sim | Sim |
| patient_portal | — | Sim | Sim |
| bi_compliance | — | Sim | Sim |
| payments_online | Add-on | Sim | Sim |
| dunning (régua) | — | Add-on | Sim |

### Limites

| Quota | Starter | Pro | Enterprise |
|-------|---------|-----|------------|
| Unidades (clínicas) | 1 | 3 | Ilimitado* |
| Usuários staff | 5 | 25 | Contrato |
| Trial | 14 dias | 14 dias | Sob proposta |

### Seed — menus Starter

`dashboard`, `clinics`, `users`, `patients`, `settings`, `appointments`, `schedules`, `reminders`, `medical_staff_ops`, `medical_records`, `prescriptions`, `certificates`, `medicines`, `exams`, `medical_staff_config`, `dashboard_finance`, `accounts_payable`, `accounts_receivable`, `financial_categories`

### Seed — extras Pro+

`queue`, `billing`, `doctor_payments`, `employee_payments`, `accounting`, `inventory`, `purchases`, `suppliers`, `bi`, `lgpd`, `patient_portal`

Enterprise = Pro + overrides de contrato (mesmos menus hoje).

---

## 4. Enforcement

```
1. Resolve Group → 2. Entitlements → 3. ∩ ACL perfil → /users/me
```

- Backend: `EntitlementService.resolve_for_group(group_id)` → `{ modules, menu_keys, feature_flags, limits }`
- Em `AccessGuard.ensure_menus`, filtrar pelo entitlement **antes** do check de perfil (inclui OWNER)
- Quotas em create clinic / invite user
- Groups **sem** assinatura: status `legacy` (libera tudo) até atribuir plano — evita quebrar tenants existentes
- Novo OWNER (`create_first_user`): trial Starter automático

### Payload em `GET /users/me`

```json
{
  "entitlements": {
    "plan": "pro",
    "status": "active",
    "modules": ["core", "agenda", "clinical"],
    "menu_keys": ["dashboard", "..."],
    "feature_flags": { "queue_enabled": true },
    "limits": { "max_clinics": 3, "max_users": 25 }
  }
}
```

Frontend: `filterMenuItems` / `PermissionGuard` exigem menuKey ∈ `entitlements.menu_keys`.

---

## 5. Ordem de implementação

| Fase | Entrega |
|------|---------|
| 1 | Tabelas + seed + EntitlementService + gate AccessGuard + `/users/me` + trial no cadastro OWNER |
| 2 | Quotas create clinic/user + sync feature flags |
| 3 | clinica-app: filter + tela admin atribuir plano |
| 4 | Stripe Subscription no Group |

## Não misturar

- Plano de saúde (convênio) ≠ assinatura SaaS
- Stripe Connect da clínica (paciente paga) ≠ cobrança Sanavita ao Group
