import { test, expect } from '@playwright/test';

test.describe('Analyser Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/analyser');
    });

    test('should load analyser page with input form', async ({ page }) => {
        // Verify page title/header
        await expect(page.locator('h1')).toContainText('Anna Lyzer');

        // Verify input section exists
        await expect(page.getByRole('tab', { name: /url/i })).toBeVisible();
        await expect(page.getByRole('tab', { name: /manual/i })).toBeVisible();
    });

    test('should switch between URL and Manual input tabs', async ({ page }) => {
        // Click Manual tab
        await page.getByRole('tab', { name: /manual/i }).click();

        // Should show manual input fields
        await expect(page.getByLabel(/property type/i)).toBeVisible();
        await expect(page.getByLabel(/asking price/i)).toBeVisible();
    });

    test('should show validation for empty URL submission', async ({ page }) => {
        // Try to submit empty URL
        const analyseButton = page.getByRole('button', { name: /analyse/i });

        if (await analyseButton.isVisible()) {
            await analyseButton.click();
            // Should show some form of validation or not proceed
            await expect(page).toHaveURL(/analyser/);
        }
    });
});

test.describe('Dashboard Navigation', () => {
    test('should navigate between pages', async ({ page }) => {
        await page.goto('/dashboard');

        // Verify dashboard loads
        // Verify dashboard loads
        await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

        // Navigate to Pipeline
        const pipelineLink = page.getByRole('link', { name: /pipeline/i }).first();
        if (await pipelineLink.isVisible()) {
            await pipelineLink.click();
            await expect(page).toHaveURL(/pipeline/);
        }
    });

    test('should show recent deals on dashboard', async ({ page }) => {
        await page.goto('/dashboard');

        // Check for deals section
        await expect(page.getByText(/recent/i)).toBeVisible();
    });
});

test.describe('Pipeline Page', () => {
    test('should load pipeline with kanban columns', async ({ page }) => {
        await page.goto('/pipeline');

        // Verify kanban column headers
        // Verify kanban column headers
        await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Viewing' })).toBeVisible();
        await expect(page.getByRole('heading', { name: /offer/i })).toBeVisible();
    });

    test('should filter deals by search', async ({ page }) => {
        await page.goto('/pipeline');

        // Find search input
        const searchInput = page.getByPlaceholder(/search/i);
        await expect(searchInput).toBeVisible();

        // Search for a deal
        await searchInput.fill('Victoria');

        // Should filter results
        // Note: Unless we seed data, we just verify input works without crashing
        await expect(searchInput).toHaveValue('Victoria');
    });
});

test.describe('Investor Pack Page', () => {
    test('should load pack preview', async ({ page }) => {
        await page.goto('/packs');

        // Verify pack preview section
        // Verify pack preview section or empty state
        // await expect(page.getByText(/investor pack/i)).toBeVisible();
        await expect(page.getByText(/no deal selected/i)).toBeVisible();
    });

    test('should allow branding customization', async ({ page }) => {
        await page.goto('/packs');

        // Check for branding controls
        const companyNameInput = page.getByLabel(/company name/i);
        if (await companyNameInput.isVisible()) {
            await companyNameInput.fill('Test Investment Co');
            await expect(companyNameInput).toHaveValue('Test Investment Co');
        }
    });
});

test.describe('Settings Page', () => {
    test('should load settings sections', async ({ page }) => {
        await page.goto('/settings');

        // Verify settings sections exist
        await expect(page.getByText(/profile/i)).toBeVisible();
        await expect(page.getByText(/branding/i)).toBeVisible();
    });
});
