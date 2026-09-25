import bundle from './documents.json'

/**
 * Documentos legais vigentes. `documents.json` é cópia gerada a partir da fonte
 * única na API (sanavita_api/src/services/legal/content) — não edite à mão; veja
 * "Documentos legais" no README.
 */
export type LegalDocument = {
  type: string
  slug: string
  title: string
  version: string
  effective_date: string
  status: string
  content_html: string
}

export const legalDocuments: LegalDocument[] = bundle.documents

const LABELS: Record<string, string> = {
  'termos-de-uso': 'Termos de uso',
  'politica-de-privacidade': 'Política de privacidade',
  'acordo-de-tratamento-de-dados': 'Acordo de tratamento de dados',
  suboperadores: 'Suboperadores',
}

export const legalPages = legalDocuments.map((doc) => ({
  slug: doc.slug,
  label: LABELS[doc.slug] ?? doc.title,
}))

export function findLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((doc) => doc.slug === slug)
}
