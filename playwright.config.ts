import { defineConfig, devices } from '@playwright/test';

const isProduction = process.env.TEST_ENV === 'production';

export default defineConfig({
    testDir: isProduction ? './tests/smoke' : './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: isProduction
            ? 'https://anna-lyzer-pro.netlify.app'
            : 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    // Only start dev server for local tests
    ...(isProduction ? {} : {
        webServer: {
            command: 'npm run dev',
            url: 'http://localhost:3000',
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
        },
    }),
});
