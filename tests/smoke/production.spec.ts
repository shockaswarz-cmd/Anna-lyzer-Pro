import { test, expect } from '@playwright/test';

/**
 * Production Smoke Tests for Anna Lyzer Pro
 * Runs against: https://anna-lyzer-pro.netlify.app
 * 
 * Usage: npm run test:e2e:prod
 */

const PRODUCTION_URL = 'https://anna-lyzer-pro.netlify.app';

test.describe('Production Smoke Tests', () => {
    test.use({ baseURL: PRODUCTION_URL });

    test('Homepage redirects to Analyser', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/analyser/);
    });

    test('Analyser page loads correctly', async ({ page }) => {
        await page.goto('/analyser');

        // Verify page header
        await expect(page.locator('h1')).toContainText('Anna Lyzer');

        // Verify input tabs
        await expect(page.getByRole('tab', { name: /url/i })).toBeVisible();
        await expect(page.getByRole('tab', { name: /manual/i })).toBeVisible();

        // No console errors
        const errors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });
        await page.waitForTimeout(1000);
        expect(errors.filter(e => !e.includes('404'))).toHaveLength(0);
    });

    test('Dashboard page loads', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    });

    test('Pipeline page loads with Kanban', async ({ page }) => {
        await page.goto('/pipeline');
        await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Viewing' })).toBeVisible();
    });

    test('Investor Pack page loads', async ({ page }) => {
        await page.goto('/packs');
        // Verify page heading
        await expect(page.getByRole('heading', { name: /investor pack generator/i })).toBeVisible();
    });

    test('Settings page loads', async ({ page }) => {
        await page.goto('/settings');
        await expect(page.getByText(/profile/i)).toBeVisible();
        await expect(page.getByText(/branding/i)).toBeVisible();
    });

    test('Sidebar navigation is operational', async ({ page }) => {
        await page.goto('/analyser');

        // Check sidebar links exist
        const navLinks = ['Dashboard', 'Analyser', 'Pipeline', 'Settings'];
        for (const linkName of navLinks) {
            await expect(page.getByRole('link', { name: new RegExp(linkName, 'i') }).first()).toBeVisible();
        }
    });

    test('Page performance is acceptable', async ({ page }) => {
        const start = Date.now();
        await page.goto('/analyser');
        const loadTime = Date.now() - start;

        // Page should load under 5 seconds
        expect(loadTime).toBeLessThan(5000);
    });
});
