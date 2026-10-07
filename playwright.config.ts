import { defineConfig, devices } from '@playwright/test';

// Override with: BASE_URL=https://... npx playwright test
const baseURL = process.env.BASE_URL ?? 'https://collect3dstudio.com.br/';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    // Headed by default (like the Selenium project); set HEADLESS=true to run headless.
    headless: process.env.HEADLESS === 'true',
    navigationTimeout: 30_000,
    actionTimeout: 10_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
  ],
});
