import { defineConfig, devices } from '@playwright/test';

const { TEST_SUITE, HEADLESS, BASE_URL, WORKERS } = process.env;

export default defineConfig({
  testDir: './tests',
  timeout: 180000,
  retries: 0,
  workers: WORKERS ? parseInt(WORKERS, 36) : 5,
  grep: TEST_SUITE ? new RegExp(`@${TEST_SUITE}`, 'i') : /.*/,

  use: {
    actionTimeout: 60000,
    baseURL: BASE_URL || 'https://www.booking.com/flights/index.en-gb.html',
    headless: HEADLESS ? (HEADLESS.toLowerCase() === 'true' ? true : false) : false,
    screenshot: 'only-on-failure',
    trace: 'on',
    video: 'on',
  },

  reporter: [['list'], ['html', { outputFolder: './playwright-report', open: 'never' }], ['junit', { outputFile: './test-results/report.xml' }]],

  projects: [
    /**
     * by default specs run on desktop only
     * use '.mobile' in spec file name to run it only on mobile
     * use '.hybrid' in spec file name to run both on mobile and desktop
     */
    {
      name: 'Desktop Chrome',
      testIgnore: [/.*mobile.spec.js/, /.*test.js/],
      use: {
         browserName: 'chromium',
         viewport: null,
         launchOptions: {
          args: ["--start-maximized"]
      } 
        },
    },
    {
      name: 'Mobile Safari',
      testMatch: [/.*mobile.spec.js/, /.*hybrid.spec.js/],
      use: devices['iPhone 12'],
    },
  ],
});

