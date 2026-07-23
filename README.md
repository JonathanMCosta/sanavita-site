# Sanavita Site

Site institucional de divulgação do sistema **Sanavita**.

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
```

## Formulário

O formulário valida campos, exibe erros e grava leads localmente em
`localStorage` (`sanavita_leads`) para demo. Em produção, conecte a um
endpoint/CRM no handler de submit.
