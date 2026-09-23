/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base da API do painel de controle, ex.: https://painel-api.exemplo.com/api/v1 */
  readonly VITE_PANEL_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
