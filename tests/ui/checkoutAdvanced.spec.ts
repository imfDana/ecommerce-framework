import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { generateUser } from '../../data/dataGenerator';

test.describe('Advanced Checkout Flows', () => {

    test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Add products to cart & 5. Click Cart button', async () => {
            await page.locator('.productinfo.text-center').first().hover();
            await page.locator('.overlay-content .add-to-cart').first().click();
            await page.locator('u', { hasText: 'View Cart' }).click();
        });

        await test.step('6. Verify cart & 7. Click Proceed To Checkout', async () => {
            await expect(page).toHaveURL(/.*view_cart/);
            await cartPage.proceedToCheckoutBtn.click();
        });

        await test.step('8. Click Register / Login button', async () => {
            await cartPage.registerLoginModalBtn.click();
        });

        await test.step('9. Fill all details in Signup and create account', async () => {
            await signupPage.signupInitial(user.name, user.email);
            await signupPage.fillSignupForm(user);
            await signupPage.clickCreateAccount();
        });

        await test.step('10. Verify ACCOUNT CREATED! & click Continue', async () => {
            await expect(page.getByTestId('account-created')).toBeVisible();
            await page.getByTestId('continue-button').click();
        });

        await test.step('11. Verify Logged in & 12. Click Cart button', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
            await page.locator('a[href="/view_cart"]').first().click();
            await homePage.waitForPageLoad();
        });

        await test.step('13. Click Proceed To Checkout button', async () => {
            await cartPage.proceedToCheckoutBtn.click();
        });

        await test.step('14. Verify Address Details & 15. Enter description & Place Order', async () => {
            await expect(checkoutPage.deliveryAddressLines).toContainText(user.address1);
            await checkoutPage.commentTextarea.fill('Order Comment TC14');
            await checkoutPage.placeOrderBtn.click();
        });

        await test.step('16. Enter payment details & 17. Click Pay', async () => {
            await checkoutPage.fillPaymentDetails('Test User', '4111', '123', '12', '2025');
            await checkoutPage.payAndConfirmBtn.click();
        });

        await test.step('18. Verify success & 19. Delete Account', async () => {
            await expect(checkoutPage.orderPlacedSuccessMsg).toBeVisible();
            await homePage.clickDeleteAccount();
            await expect(page.getByTestId('account-deleted')).toBeVisible();
        });
    });

    test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Click Signup / Login button & 5. Fill details', async () => {
            await homePage.clickSignupLogin();
            await signupPage.signupInitial(user.name, user.email);
            await signupPage.fillSignupForm(user);
            await signupPage.clickCreateAccount();
        });

        await test.step('6. Verify ACCOUNT CREATED! & 7. Verify Logged in', async () => {
            await page.getByTestId('continue-button').click();
            await expect(homePage.loggedInAsText).toBeVisible();
        });

        await test.step('8. Add products to cart & 9. Click Cart button', async () => {
            await page.locator('.productinfo.text-center').first().hover();
            await page.locator('.overlay-content .add-to-cart').first().click();
            await page.locator('u', { hasText: 'View Cart' }).click();
        });

        await test.step('10. Verify cart & 11. Click Proceed To Checkout', async () => {
            await expect(page).toHaveURL(/.*view_cart/);
            await cartPage.proceedToCheckoutBtn.click();
        });

        await test.step('12. Verify delivery address is same address filled & 13. Verify billing address', async () => {
            await expect(checkoutPage.deliveryAddressLines).toContainText(user.address1);
            await expect(checkoutPage.billingAddressLines).toContainText(user.address1);
        });

        await test.step('14. Click Delete Account button', async () => {
            await homePage.clickDeleteAccount();
            await expect(page.getByTestId('account-deleted')).toBeVisible();
        });
    });
});
