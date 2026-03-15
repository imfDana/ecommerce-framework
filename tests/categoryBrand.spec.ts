import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Category & Brand Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Block Google Ads
        await page.route('**/*googlesyndication.com/**', route => route.abort());
        await page.route('**/*doubleclick.net/**', route => route.abort());
    });

    test('Test Case 18: View Category Products', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Click on Women category & 5. Click on Dress sub-category', async () => {
            await page.locator('a[href="#Women"]').click();
            await page.locator('a[href="/category_products/1"]').click();
            await homePage.bypassAds();
        });

        await test.step('6. Verify that category page is displayed and confirm text WOMEN - TOPS PRODUCTS', async () => {
            await expect(page.locator('h2.title', { hasText: 'Women - Dress Products' })).toBeVisible();
        });

        await test.step('7. On left side bar, click on any sub-category link of Men category', async () => {
            await page.locator('a[href="#Men"]').click();
            await page.locator('a[href="/category_products/3"]').click();
            await homePage.bypassAds();
        });

        await test.step('8. Verify that user is navigated to that category page', async () => {
            await expect(page.locator('h2.title', { hasText: 'Men - Tshirts Products' })).toBeVisible();
        });
    });

    test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await homePage.productsBtn.click();
            await homePage.bypassAds();
        });

        await test.step('4. Verify that Brands are visible on left side bar', async () => {
            await expect(page.locator('.brands_products')).toBeVisible();
        });

        await test.step('5. Click on any brand name & 6. Verify navigation to brand page', async () => {
            await page.locator('a[href="/brand_products/Polo"]').click();
            await homePage.bypassAds();
            await expect(page.locator('h2.title', { hasText: 'Brand - Polo Products' })).toBeVisible();
        });

        await test.step('7. On left side bar, click on any other brand link', async () => {
            await page.locator('a[href="/brand_products/H&M"]').click();
            await homePage.bypassAds();
        });

        await test.step('8. Verify navigation to that brand page and can see products', async () => {
            await expect(page.locator('h2.title', { hasText: 'Brand - H&M Products' })).toBeVisible();
        });
    });

});
