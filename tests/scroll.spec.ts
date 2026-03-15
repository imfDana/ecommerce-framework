import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';

test.describe('Scroll functionality', () => {

    test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Scroll down page to bottom & 5. Verify SUBSCRIPTION is visible', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
        });

        await test.step('6. Click on arrow at bottom right side to move upward', async () => {
            await page.locator('#scrollUp').click();
        });

        await test.step('7. Verify that page is scrolled up and Full-Fledged practice website for Automation Engineers text is visible', async () => {
            await expect(page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first()).toBeVisible();
        });
    });

    test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Scroll down page to bottom & 5. Verify SUBSCRIPTION is visible', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
        });

        await test.step('6. Scroll up page to top', async () => {
            await page.evaluate(() => window.scrollTo(0, 0));
        });

        await test.step('7. Verify that page is scrolled up and Full-Fledged practice website for Automation Engineers text is visible', async () => {
            await expect(page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first()).toBeVisible();
        });
    });
});
