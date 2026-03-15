import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';

test.describe('Subscription Tests', () => {
    test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1. Launch browser & 2. Navigate to url', async () => {
            await homePage.goto();
        });

        await test.step('3. Verify that home page is visible successfully', async () => {
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Scroll down to footer & 5. Verify text SUBSCRIPTION', async () => {
            await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
        });

        await test.step('6. Enter email address in input and click arrow button', async () => {
            await page.locator('#susbscribe_email').fill('test_sub@test.com');
            await page.locator('#subscribe').click();
        });

        await test.step('7. Verify success message You have been successfully subscribed! is visible', async () => {
            await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!');
        });
    });

    test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Click Cart button', async () => {
            await page.locator('a[href="/view_cart"]').first().click();
            await homePage.waitForPageLoad();
        });

        await test.step('5. Scroll down to footer & 6. Verify text SUBSCRIPTION', async () => {
            await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
        });

        await test.step('7. Enter email address in input and click arrow button', async () => {
            await page.locator('#susbscribe_email').fill('test_sub_cart@test.com');
            await page.locator('#subscribe').click();
        });

        await test.step('8. Verify success message', async () => {
            await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!');
        });
    });
});
