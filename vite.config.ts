import { defineConfig } from 'vite'

// Em GitHub Pages o site fica em https://<user>.github.io/<repo>/
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ??
  process.env.VITE_REPO_NAME ??
  'sanavita-site'

const isPagesBuild =
  process.env.GITHUB_ACTIONS === 'true' || process.env.DEPLOY_GITHUB_PAGES === 'true'

export default defineConfig({
  base: isPagesBuild ? `/${repoName}/` : '/',
})
