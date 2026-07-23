export type ContactPayload = {
  name: string
  email: string
  clinic: string
  phone: string
  teamSize: string
  message: string
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function readContactForm(form: HTMLFormElement): ContactPayload {
  const data = new FormData(form)
  const get = (key: keyof ContactPayload) =>
    String(data.get(key) ?? '').trim()

  return {
    name: get('name'),
    email: get('email'),
    clinic: get('clinic'),
    phone: get('phone'),
    teamSize: get('teamSize'),
    message: get('message'),
  }
}

export function validateContact(payload: ContactPayload): FieldErrors {
  const errors: FieldErrors = {}

  if (payload.name.length < 2) {
    errors.name = 'Informe seu nome completo.'
  }

  if (!EMAIL_RE.test(payload.email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (payload.clinic.length < 2) {
    errors.clinic = 'Informe a clínica e a cidade.'
  }

  if (payload.phone && payload.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Telefone inválido. Use DDD + número.'
  }

  if (payload.message.length > 800) {
    errors.message = 'Mensagem deve ter no máximo 800 caracteres.'
  }

  return errors
}

export function persistLead(payload: ContactPayload) {
  try {
    const key = 'sanavita_leads'
    const current = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
    const next = [
      ...current,
      { ...payload, createdAt: new Date().toISOString() },
    ].slice(-50)
    localStorage.setItem(key, JSON.stringify(next))
  } catch {
    // storage indisponível — ignora sem quebrar a UX
  }
}
