import { defineConfig } from 'vite'

// Em GitHub Pages o site fica em https://<user>.github.io/<repo>/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'sanavita-site'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/',
})
