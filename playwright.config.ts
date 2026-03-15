import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 3 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      suiteTitle: false,
      environmentInfo: {
        os_platform: process.platform,
        os_release: process.release,
        node_version: process.version,
      },
    }],
  ],
  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-qa',
    // Block common ad networks to prevent test flakiness from floating/vignette ads
    actionTimeout: 15000,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
});
