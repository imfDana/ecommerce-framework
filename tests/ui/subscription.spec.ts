import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';

test.describe('Subscription Tests', () => {
    test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Scroll down to footer & 5. Verify text SUBSCRIPTION', async () => {
            await expect(homePage.subscriptionTitle).toBeVisible();
        });

        await test.step('6. Enter email address in input and click arrow button', async () => {
            await homePage.subscribe('test_sub@test.com');
        });

        await test.step('7. Verify success message You have been successfully subscribed! is visible', async () => {
            await expect(homePage.subscriptionSuccessMsg).toHaveText('You have been successfully subscribed!');
        });
    });

    test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Click Cart button', async () => {
            await homePage.cartBtn.click();
            await homePage.waitForPageLoad();
        });

        await test.step('5. Scroll down to footer & 6. Verify text SUBSCRIPTION', async () => {
            await expect(homePage.subscriptionTitle).toBeVisible();
        });

        await test.step('7. Enter email address in input and click arrow button', async () => {
            await homePage.subscribe('test_sub_cart@test.com');
        });

        await test.step('8. Verify success message', async () => {
            await expect(homePage.subscriptionSuccessMsg).toHaveText('You have been successfully subscribed!');
        });
    });
});
