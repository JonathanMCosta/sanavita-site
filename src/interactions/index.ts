import { on, qs, qsa } from '../lib/dom'
import { PLANS_LOADED_EVENT } from '../lib/plans'
import {
  persistLead,
  readContactForm,
  validateContact,
  type FieldErrors,
} from '../lib/validate'

function setupTopbar() {
  const topbar = qs<HTMLElement>('[data-topbar]')
  const onScroll = () => {
    topbar?.classList.toggle('topbar--solid', window.scrollY > 12)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

function setupMenu() {
  const menuBtn = qs<HTMLButtonElement>('[data-menu-btn]')
  const nav = qs<HTMLElement>('[data-nav]')
  if (!menuBtn || !nav) return

  nav.id = 'menu-principal'

  const close = () => {
    nav.classList.remove('nav--open')
    menuBtn.classList.remove('menu-btn--open')
    menuBtn.setAttribute('aria-expanded', 'false')
    menuBtn.setAttribute('aria-label', 'Abrir menu')
  }

  const open = () => {
    nav.classList.add('nav--open')
    menuBtn.classList.add('menu-btn--open')
    menuBtn.setAttribute('aria-expanded', 'true')
    menuBtn.setAttribute('aria-label', 'Fechar menu')
  }

  on(menuBtn, 'click', () => {
    if (nav.classList.contains('nav--open')) close()
    else open()
  })

  qsa<HTMLAnchorElement>('a', nav).forEach((link) => {
    on(link, 'click', close)
  })

  on(document, 'keydown', (event) => {
    if (event.key === 'Escape') close()
  })
}

function clearErrors(form: HTMLFormElement) {
  qsa<HTMLElement>('[data-error-for]', form).forEach((el) => {
    el.textContent = ''
  })
  qsa<HTMLElement>('input, textarea, select', form).forEach((el) => {
    el.removeAttribute('aria-invalid')
  })
}

function showErrors(form: HTMLFormElement, errors: FieldErrors) {
  clearErrors(form)
  for (const [field, message] of Object.entries(errors)) {
    const errorEl = qs<HTMLElement>(`[data-error-for="${field}"]`, form)
    const input = qs<HTMLElement>(`[name="${field}"]`, form)
    if (errorEl) errorEl.textContent = message || ''
    if (input) input.setAttribute('aria-invalid', 'true')
  }
}

function setupContactForm() {
  const form = qs<HTMLFormElement>('[data-contact-form]')
  const note = qs<HTMLElement>('[data-form-note]')
  if (!form || !note) return
  const submit = qs<HTMLButtonElement>('[data-submit]', form)
  if (!submit) return
  const planSelect = qs<HTMLSelectElement>('[data-plan-select]', form)

  const applyPlanInterest = (planCode: string | null | undefined) => {
    if (!planSelect || !planCode) return
    const normalized = planCode.trim().toLowerCase()
    const exists = Array.from(planSelect.options).some((option) => option.value === normalized)
    if (exists) planSelect.value = normalized
  }

  const params = new URLSearchParams(window.location.search)
  applyPlanInterest(params.get('plano'))
  document.addEventListener(PLANS_LOADED_EVENT, () => applyPlanInterest(params.get('plano')))

  // Os cards de plano chegam da API depois do setup, por isso a delegação.
  on(document, 'click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLElement>('[data-plan-interest]')
    if (link) applyPlanInterest(link.dataset.planInterest)
  })

  on(form, 'submit', (event) => {
    event.preventDefault()
    const payload = readContactForm(form)
    const errors = validateContact(payload)

    if (Object.keys(errors).length > 0) {
      showErrors(form, errors)
      note.hidden = false
      note.classList.add('form-note--error')
      note.textContent = 'Revise os campos destacados para continuar.'
      return
    }

    clearErrors(form)
    persistLead(payload)
    submit.disabled = true
    submit.textContent = 'Enviando...'

    window.setTimeout(() => {
      note.hidden = false
      note.classList.remove('form-note--error')
      note.textContent =
        'Recebemos seu interesse! Em produção, este formulário envia para o time comercial.'
      form.reset()
      submit.disabled = false
      submit.textContent = 'Solicitar demonstração'
    }, 450)
  })
}

function setupReveal() {
  const nodes = qsa<HTMLElement>('[data-reveal]')
  if (!nodes.length || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  nodes.forEach((node) => observer.observe(node))
}

function setupLightbox() {
  const root = qs<HTMLElement>('[data-lightbox]')
  const image = qs<HTMLImageElement>('[data-lightbox-image]')
  const closeBtn = qs<HTMLButtonElement>('[data-lightbox-close]')
  if (!root || !image || !closeBtn) return

  const close = () => {
    root.hidden = true
    image.removeAttribute('src')
    document.body.classList.remove('lightbox-open')
  }

  const open = (src: string, alt: string) => {
    image.src = src
    image.alt = alt
    root.hidden = false
    document.body.classList.add('lightbox-open')
    closeBtn.focus()
  }

  qsa<HTMLButtonElement>('[data-lightbox-src]').forEach((button) => {
    on(button, 'click', () => {
      const src = button.dataset.lightboxSrc
      const alt = button.dataset.lightboxAlt || ''
      if (src) open(src, alt)
    })
  })

  on(closeBtn, 'click', close)
  on(root, 'click', (event) => {
    if (event.target === root) close()
  })
  on(document, 'keydown', (event) => {
    if (event.key === 'Escape' && !root.hidden) close()
  })
}

function setupFaq() {
  const list = qs<HTMLElement>('[data-faq]')
  if (!list) return

  const items = qsa<HTMLDetailsElement>('details', list)
  items.forEach((item) => {
    on(item, 'toggle', () => {
      if (!item.open) return
      items.forEach((other) => {
        if (other !== item) other.open = false
      })
    })
  })

  const nav = qs<HTMLElement>('[data-faq-nav]')
  if (!nav) return

  qsa<HTMLButtonElement>('[data-faq-filter]', nav).forEach((button) => {
    on(button, 'click', () => {
      const filter = button.dataset.faqFilter ?? 'all'
      qsa<HTMLButtonElement>('[data-faq-filter]', nav).forEach((other) => {
        other.classList.toggle('is-active', other === button)
      })

      items.forEach((item) => {
        const category = item.dataset.faqCategory ?? ''
        const match = filter === 'all' || category === filter
        item.hidden = !match
        if (!match) item.open = false
      })

      const firstVisible = items.find((item) => !item.hidden)
      if (firstVisible && !items.some((item) => item.open && !item.hidden)) {
        firstVisible.open = true
      }
    })
  })
}

function setupSmoothAnchors() {
  on(document, 'click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
    const id = link?.getAttribute('href')?.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  })
}

export function setupInteractions() {
  setupTopbar()
  setupMenu()
  setupContactForm()
  setupReveal()
  setupLightbox()
  setupFaq()
  setupSmoothAnchors()
}
