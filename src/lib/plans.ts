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

/** Cópia gravada pelo painel no bucket do site a cada mudança no catálogo. */
const SNAPSHOT_URL = `${import.meta.env.BASE_URL}plans.json`
const STORAGE_KEY = 'sanavita:last-plans'
const API_TIMEOUT_MS = 5000

export type PlansSource = 'api' | 'snapshot' | 'browser'

function isPlan(value: unknown): value is PublicPlan {
  const plan = value as PublicPlan
  return typeof plan?.code === 'string' && typeof plan?.name === 'string'
}

/** Aceita a lista da API ou o formato do snapshot ({ generated_at, plans }). */
function toPlans(body: unknown): PublicPlan[] {
  const list = Array.isArray(body) ? body : (body as { plans?: unknown })?.plans
  if (!Array.isArray(list) || !list.every(isPlan)) throw new Error('Formato de planos inválido')
  return list.map((plan) => ({ ...plan, highlights: plan.highlights ?? [] }))
}

async function getJson(url: string, timeoutMs: number): Promise<unknown> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-cache' })
    if (!response.ok) throw new Error(`HTTP ${response.status} em ${url}`)
    return await response.json()
  } finally {
    window.clearTimeout(timer)
  }
}

function remember(plans: PublicPlan[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
  } catch {
    // Modo privado / storage cheio: segue sem a cópia local.
  }
}

function recall(): PublicPlan[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? toPlans(JSON.parse(stored)) : null
  } catch {
    return null
  }
}

/**
 * Planos na ordem de preferência: API do painel (mais atual) -> cópia do painel
 * no bucket do site -> última lista vista neste navegador.
 */
export async function fetchPlans(): Promise<{ plans: PublicPlan[]; source: PlansSource }> {
  const attempts: Array<[PlansSource, () => Promise<unknown>]> = [
    ['snapshot', () => getJson(SNAPSHOT_URL, API_TIMEOUT_MS)],
  ]
  if (API_URL) attempts.unshift(['api', () => getJson(`${API_URL}/public/plans`, API_TIMEOUT_MS)])

  for (const [source, load] of attempts) {
    try {
      const plans = toPlans(await load())
      remember(plans)
      return { plans, source }
    } catch (error) {
      console.warn(`Planos: ${source} indisponível`, error)
    }
  }

  const stored = recall()
  if (stored) return { plans: stored, source: 'browser' }
  throw new Error('Planos indisponíveis (API, cópia do site e navegador)')
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
    const { plans, source } = await fetchPlans()
    container.dataset.plansSource = source
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
