// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuração do Playwright para o projeto de automação.
 * Documentação: https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  // Roda os testes em arquivos em paralelo
  fullyParallel: true,

  // Falha o build no CI se algum test.only for esquecido no código
  forbidOnly: !!process.env.CI,

  // Tenta novamente em caso de falha somente no CI
  retries: process.env.CI ? 2 : 0,

  // Workers em paralelo (limita no CI para evitar flakiness)
  workers: process.env.CI ? 1 : undefined,

  // Reporter usado nos testes
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Configurações compartilhadas por todos os projetos
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Projetos para rodar os testes em diferentes navegadores
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
