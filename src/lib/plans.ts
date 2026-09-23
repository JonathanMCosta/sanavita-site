import { escapeHtml } from './dom'

/** Plano como vem de GET /api/v1/public/plans (API do painel de controle). */
export type PublicPlan = {
  code: string
  name: string
  description: string | null
  highlights: string[]
  is_featured: boolean
  price_cents_month: number | null
  max_clinics: number | null
  max_users: number | null
  trial_days: number
}

const API_URL = (import.meta.env.VITE_PANEL_API_URL ?? '').replace(/\/+$/, '')

export const PLANS_LOADED_EVENT = 'sanavita:plans-loaded'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function priceLabel(plan: PublicPlan): string {
  if (plan.price_cents_month == null) return 'Sob proposta'
  return `A partir de ${brl.format(plan.price_cents_month / 100)}/mês*`
}

/** Itens do card; sem itens cadastrados, resume os limites da versão publicada. */
export function planItems(plan: PublicPlan): string[] {
  if (plan.highlights.length > 0) return plan.highlights
  const units = plan.max_clinics == null ? 'Unidades ilimitadas' : `Até ${plan.max_clinics} unidade(s)`
  const users = plan.max_users == null ? 'usuários ilimitados' : `${plan.max_users} usuário(s)`
  const trial = plan.trial_days > 0 ? ` · trial de ${plan.trial_days} dias` : ''
  return [`${units} e ${users}${trial}`]
}

export async function fetchPlans(signal?: AbortSignal): Promise<PublicPlan[]> {
  if (!API_URL) throw new Error('VITE_PANEL_API_URL não configurada')
  const response = await fetch(`${API_URL}/public/plans`, { signal })
  if (!response.ok) throw new Error(`Planos indisponíveis (HTTP ${response.status})`)
  return (await response.json()) as PublicPlan[]
}

function renderPlan(plan: PublicPlan): string {
  const featured = plan.is_featured
  return `
    <article class="plan${featured ? ' plan--featured' : ''}">
      ${featured ? '<p class="plan__badge">Recomendado</p>' : ''}
      <h3>${escapeHtml(plan.name)}</h3>
      <p class="plan__price">${escapeHtml(priceLabel(plan))}</p>
      ${plan.description ? `<p class="plan__note">${escapeHtml(plan.description)}</p>` : ''}
      <ul>
        ${planItems(plan).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
      <a
        class="btn ${featured ? 'btn--primary' : 'btn--soft'}"
        href="#contato"
        data-plan-interest="${escapeHtml(plan.code)}"
      >
        Solicitar proposta
      </a>
    </article>`
}

export function renderPlansLoading(count = 3): string {
  return Array.from(
    { length: count },
    () => `
    <article class="plan plan--skeleton" aria-hidden="true">
      <span class="skeleton skeleton--title"></span>
      <span class="skeleton skeleton--price"></span>
      <span class="skeleton"></span>
      <span class="skeleton"></span>
      <span class="skeleton"></span>
    </article>`
  ).join('')
}

function renderPlansError(): string {
  return `
    <div class="plans__status" role="status">
      <p>Não foi possível carregar os planos agora.</p>
      <p>
        Fale com o time comercial pelo formulário abaixo ou
        <button type="button" class="link-button" data-plans-retry>tente de novo</button>.
      </p>
    </div>`
}

function fillPlanSelect(plans: PublicPlan[]) {
  const select = document.querySelector<HTMLSelectElement>('[data-plan-select]')
  if (!select) return
  const selected = select.value
  select.querySelectorAll('option[data-plan-option]').forEach((option) => option.remove())
  for (const plan of plans) {
    const option = document.createElement('option')
    option.value = plan.code
    option.textContent = plan.name
    option.dataset.planOption = ''
    select.append(option)
  }
  if (plans.some((plan) => plan.code === selected)) select.value = selected
}

/** Preenche os cards e o select do formulário com os planos do painel. */
export async function loadPlans(): Promise<void> {
  const container = document.querySelector<HTMLElement>('[data-plans]')
  if (!container) return

  container.setAttribute('aria-busy', 'true')
  container.innerHTML = renderPlansLoading()
  try {
    const plans = await fetchPlans()
    container.innerHTML = plans.length
      ? plans.map(renderPlan).join('')
      : `<div class="plans__status" role="status"><p>Planos sob consulta: fale com o time comercial.</p></div>`
    fillPlanSelect(plans)
    document.dispatchEvent(new CustomEvent(PLANS_LOADED_EVENT))
  } catch (error) {
    console.error(error)
    container.innerHTML = renderPlansError()
    container
      .querySelector<HTMLButtonElement>('[data-plans-retry]')
      ?.addEventListener('click', () => void loadPlans(), { once: true })
  } finally {
    container.removeAttribute('aria-busy')
  }
}
