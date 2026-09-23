# Sanavita Site

Site institucional de divulgação do sistema **Sanavita**.

Hospedagem: S3 (+ CloudFront quando habilitado) criado pelo `sanavita_iac` (`module.site`).

## Desenvolvimento

```bash
npm install
cp .env.example .env.local   # aponta para a API do painel local (http://localhost:8001/api/v1)
npm run dev
```

## Planos de acesso

Os cards da seção **Planos** e as opções do formulário vêm da API do painel de
controle (`GET {VITE_PANEL_API_URL}/public/plans`, sem login). Aparecem os planos
**públicos** com versão **publicada**, na ordem e com o destaque "Recomendado"
definidos no painel — criar/publicar um plano lá já o mostra no site, sem novo deploy
(a resposta tem cache de 60 s). Se a API não responder, o site mostra um aviso com
opção de tentar de novo.

## Build

```bash
npm run build
npm run preview
```

## Publicação (AWS via Azure DevOps)

`azure-pipelines.yml` roda em push para `develop`/`main` (no remote `azure`):
build (`tsc` + `vite build`) → `aws s3 sync` → invalidação do CloudFront, se configurado.

1. Crie o pipeline no Azure DevOps apontando para `azure-pipelines.yml`.
2. Crie o variable group `sanavita-aws-site-dev` com `AWS_REGION`, `S3_BUCKET`,
   `CLOUDFRONT_DISTRIBUTION_ID` (opcional) e `VITE_PANEL_API_URL` — os valores saem de
   `terraform output azure_devops_variable_groups_hint` no `sanavita_iac`.
3. O pipeline usa a service connection `aws-sanavita`.

## Arquitetura

```
src/
  main.ts                 # bootstrap
  content.ts              # textos e dados
  render/page.ts          # HTML da página
  interactions/index.ts   # menu, form, lightbox, reveal, FAQ
  lib/dom.ts              # helpers DOM
  lib/plans.ts            # planos vindos da API do painel
  lib/validate.ts         # validação do lead
  style.css               # estilos responsivos
public/
  screenshots/            # prints do produto
  robots.txt
  sitemap.xml
azure-pipelines.yml       # CI/CD → S3 (+ CloudFront)
```

## Formulário

O formulário valida campos, exibe erros e grava leads localmente em
`localStorage` (`sanavita_leads`) para demo. Em produção, conecte a um
endpoint/CRM no handler de submit.
