# Sanavita Site

Site institucional de divulgação do sistema **Sanavita**.

**Produção:** https://jonathanmcosta.github.io/sanavita-site/

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Publicação (GitHub Pages)

O deploy é automático via **GitHub Actions** em todo push na branch `main`
(`.github/workflows/deploy.yml`).

1. Repo: https://github.com/JonathanMCosta/sanavita-site
2. Em **Settings → Pages**, use Source = **GitHub Actions**
3. Faça push em `main` — o workflow faz build e publica

## Arquitetura

```
src/
  main.ts                 # bootstrap
  content.ts              # textos e dados
  render/page.ts          # HTML da página
  interactions/index.ts   # menu, form, lightbox, reveal, FAQ
  lib/dom.ts              # helpers DOM
  lib/validate.ts         # validação do lead
  style.css               # estilos responsivos
public/
  screenshots/            # prints do produto
  robots.txt
  sitemap.xml
.github/workflows/
  deploy.yml              # CI/CD → GitHub Pages
```

## Formulário

O formulário valida campos, exibe erros e grava leads localmente em
`localStorage` (`sanavita_leads`) para demo. Em produção, conecte a um
endpoint/CRM no handler de submit.
