import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Páginas legais como .html na raiz: o CloudFront (origem S3 privada) não resolve
// /termos-de-uso/ para index.html.
const legalPages = [
  'termos-de-uso',
  'politica-de-privacidade',
  'acordo-de-tratamento-de-dados',
  'suboperadores',
]

// Publicado na raiz do bucket S3 / distribuição CloudFront.
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          legalPages.map((slug) => [slug, resolve(__dirname, `${slug}.html`)])
        ),
      },
    },
  },
})
