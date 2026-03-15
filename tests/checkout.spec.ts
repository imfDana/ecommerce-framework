import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { generateUser } from '../data/dataGenerator';
import { APIUtils } from '../utils/apiUtils';

test.describe('Checkout Flows', () => {

    test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        await test.step('1-3 Setup', async () => {
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Click Signup / Login button & 5. Fill details', async () => {
            await homePage.clickSignupLogin();
            await loginSignupPage.signupInitial(user.name, user.email);
            await loginSignupPage.fillSignupForm(user);
            await loginSignupPage.clickCreateAccount();
        });

        await test.step('6. Verify ACCOUNT CREATED! & click Continue', async () => {
            await expect(page.getByTestId('account-created')).toBeVisible();
            await page.getByTestId('continue-button').click();
        });

        await test.step('7. Verify Logged in as username', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
        });

        await test.step('8. Add products to cart & 9. Click Cart', async () => {
            await page.locator('.productinfo.text-center').first().hover();
            await page.locator('.overlay-content .add-to-cart').first().click();
            await page.locator('u', { hasText: 'View Cart' }).click();
        });

        await test.step('10. Verify cart & 11. Click Proceed To Checkout', async () => {
            await expect(page).toHaveURL(/.*view_cart/);
            await cartPage.proceedToCheckoutBtn.click();
        });

        await test.step('12. Verify Address Details and Review Your Order', async () => {
            await expect(checkoutPage.deliveryAddressLines).toContainText(user.address1);
            await expect(checkoutPage.billingAddressLines).toContainText(user.address1);
        });

        await test.step('13. Enter description & 14. Click Place Order', async () => {
            await checkoutPage.commentTextarea.fill('Test Order Comment');
            await checkoutPage.placeOrderBtn.click();
        });

        await test.step('15. Enter payment details & 16. Click Pay and Confirm Order', async () => {
            await checkoutPage.fillPaymentDetails('Test Card', '411111111111', '123', '12', '2025');
            await checkoutPage.payAndConfirmBtn.click();
        });

        await test.step('17. Verify success message & 18. Delete Account', async () => {
            await expect(checkoutPage.orderPlacedSuccessMsg).toBeVisible();
            await homePage.clickDeleteAccount();
            await expect(page.getByTestId('account-deleted')).toBeVisible();
        });
    });

    test('Test Case 16: Place Order: Login before Checkout', async ({ page, request }) => {
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const apiUtils = new APIUtils(request);
        const user = generateUser();

        await test.step('Setup API', async () => {
            await apiUtils.createAccount(user);
        });

        await test.step('4. Click Signup / Login button & 5. Fill email, password and click Login', async () => {
            await homePage.clickSignupLogin();
            await loginSignupPage.login(user.email, user.password);
        });

        await test.step('6. Verify Logged in as username', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
        });

        await test.step('7. Add products to cart & 8. Click Cart button', async () => {
            await page.locator('.productinfo.text-center').first().hover();
            await page.locator('.overlay-content .add-to-cart').first().click();
            await page.locator('u', { hasText: 'View Cart' }).click();
        });

        await test.step('9. Verify cart & 10. Click Proceed To Checkout', async () => {
            await expect(page).toHaveURL(/.*view_cart/);
            await cartPage.proceedToCheckoutBtn.click();
        });

        await test.step('11. Verify Address Details & 12. Enter description and Place Order', async () => {
            await expect(checkoutPage.deliveryAddressLines).toContainText(user.address1);
            await checkoutPage.commentTextarea.fill('Test Order Comment');
            await checkoutPage.placeOrderBtn.click();
        });

        await test.step('13. Enter payment details & 14. Click Pay and Confirm Order', async () => {
            await checkoutPage.fillPaymentDetails('Test Card', '411111111111', '123', '12', '2025');
            await checkoutPage.payAndConfirmBtn.click();
        });

        await test.step('15. Verify success & 16. Delete Account', async () => {
            await expect(checkoutPage.orderPlacedSuccessMsg).toBeVisible();
            await homePage.clickDeleteAccount();
            await expect(page.getByTestId('account-deleted')).toBeVisible();
        });
    });

    test('Test Case 24: Download Invoice after purchase order', async ({ page, request }) => {
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const apiUtils = new APIUtils(request);
        const user = generateUser();

        await test.step('Setup user and login via API', async () => {
            await apiUtils.createAccount(user);
            await homePage.clickSignupLogin();
            await loginSignupPage.login(user.email, user.password);
        });

        await test.step('4-18. Add product, checkout, and pay', async () => {
            await page.locator('.productinfo.text-center').first().hover();
            await page.locator('.overlay-content .add-to-cart').first().click();
            await page.locator('u', { hasText: 'View Cart' }).click();
            await cartPage.proceedToCheckoutBtn.click();
            await checkoutPage.commentTextarea.fill('Test');
            await checkoutPage.placeOrderBtn.click();
            await checkoutPage.fillPaymentDetails('Test', '411', '123', '12', '2025');
            await checkoutPage.payAndConfirmBtn.click();
        });

        await test.step('19. Click Download Invoice button and verify invoice is downloaded successfully', async () => {
            const downloadPromise = page.waitForEvent('download');
            await checkoutPage.downloadInvoiceBtn.click();
            const download = await downloadPromise;
            expect(download.suggestedFilename()).toBe('invoice.txt');
        });

        await test.step('20. Click Continue & 21. Delete Account', async () => {
            await checkoutPage.continueBtn.click();
            await homePage.clickDeleteAccount();
        });
    });

});
