import { defineConfig, devices } from '@playwright/test'

// Endereço testado. Sem a variável, os testes rodam contra o build local (npm start).
// Na ZV-4, a CI passa a apontar BASE_URL para o preview da Netlify de cada PR.
const baseURL = process.env.BASE_URL ?? 'http://localhost:3000'
const isLocal = !process.env.BASE_URL

export default defineConfig({
  testDir: './tests',
  // Referências da regressão visual (ZV-48): um nome só, sem separar por sistema.
  snapshotPathTemplate: '{testDir}/visual/referencias/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: isLocal
    ? {
        command: 'npm start',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      }
    : undefined,
})
