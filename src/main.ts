import './style.css'
import { setupInteractions } from './interactions'
import { renderPage } from './render/page'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) {
  throw new Error('Elemento #app não encontrado')
}

app.innerHTML = renderPage()
setupInteractions()
