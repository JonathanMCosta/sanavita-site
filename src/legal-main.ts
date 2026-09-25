import './style.css'
import { findLegalDocument } from './legal/documents'
import { renderLegalPage } from './legal/page'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('Elemento #app não encontrado')
}

const slug = app.dataset.legal ?? ''
const doc = findLegalDocument(slug)
if (doc) document.title = `${doc.title} — Sanavita`

app.innerHTML = renderLegalPage(slug)
