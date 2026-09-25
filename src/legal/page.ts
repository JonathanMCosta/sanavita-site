import { site } from '../content'
import { escapeHtml } from '../lib/dom'
import { asset, renderFooter } from '../render/page'
import { findLegalDocument, legalPages } from './documents'

function formatDate(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

/** Página de um documento legal (termos-de-uso.html, politica-de-privacidade.html…). */
export function renderLegalPage(slug: string) {
  const doc = findLegalDocument(slug)
  const home = asset('')
  const tabs = legalPages
    .map(
      (page) => `
        <a
          class="legal-tabs__item${page.slug === slug ? ' is-active' : ''}"
          href="${asset(`${page.slug}.html`)}"
          ${page.slug === slug ? 'aria-current="page"' : ''}
        >${escapeHtml(page.label)}</a>`
    )
    .join('')

  // content_html vem do export da API: texto escapado antes da formatação.
  const body = doc
    ? `
      <p class="legal-meta">Versão ${escapeHtml(doc.version)} — vigente desde ${formatDate(doc.effective_date)}</p>
      <article class="legal-content">${doc.content_html}</article>`
    : `<p class="legal-meta">Documento não encontrado.</p>`

  return `
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <header class="topbar topbar--solid">
    <div class="container topbar__inner">
      <a class="brand" href="${home}" aria-label="${site.name} início">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__name">${site.name}</span>
      </a>
      <div class="topbar__actions">
        <a class="btn btn--ghost" href="${home}">Voltar ao site</a>
      </div>
    </div>
  </header>

  <main id="conteudo" class="section legal">
    <div class="container legal__inner">
      <nav class="legal-tabs" aria-label="Documentos legais">${tabs}</nav>
      ${body}
    </div>
  </main>

  ${renderFooter(home)}
  `
}
