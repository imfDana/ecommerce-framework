import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';

test.describe('Scroll Tests', () => {

    test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3. Launch browser, navigate to home page and verify', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Scroll down page to bottom', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        });

        await test.step('5. Verify SUBSCRIPTION is visible', async () => {
            await expect(homePage.subscriptionTitle).toBeVisible();
        });

        await test.step('6. Click on arrow at bottom right side to move upward', async () => {
            await homePage.scrollUpBtn.click();
        });

        await test.step('7. Verify page is scrolled up and hero text is visible', async () => {
            await expect(homePage.carouselTitle).toBeVisible();
        });
    });

    test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3. Launch browser, navigate to home page and verify', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Scroll down page to bottom', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        });

        await test.step('5. Verify SUBSCRIPTION is visible', async () => {
            await expect(homePage.subscriptionTitle).toBeVisible();
        });

        await test.step('6. Scroll up page to top', async () => {
            await page.evaluate(() => window.scrollTo(0, 0));
        });

        await test.step('7. Verify page is scrolled up and hero text is visible', async () => {
            await expect(homePage.carouselTitle).toBeVisible();
        });
    });

});
