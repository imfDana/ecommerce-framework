import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { ProductsPage } from '../../pages/productsPage';
import { generateUser } from '../../data/dataGenerator';

test.describe('Checkout Tests', () => {

    test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        await test.step('1-3. Launch browser, navigate to home page and verify', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Add products to cart', async () => {
            await productsPage.addFirstProductToCart();
            await cartPage.continueShoppingBtn.click();
        });

        await test.step('5-6. Click Cart button and verify cart page is displayed', async () => {
            await cartPage.cartBtn.click();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step('7. Click Proceed To Checkout', async () => {
            await cartPage.proceedToCheckoutBtn.click();
        });

        await test.step('8. Click Register / Login button', async () => {
            await cartPage.registerLoginModalBtn.click();
            await cartPage.waitForPageLoad();
        });

        await test.step('9. Fill all details in Signup and create account', async () => {
            await signupPage.signupInitial(user.name, user.email);
            await signupPage.fillSignupForm(user);
            await signupPage.clickCreateAccount();
        });

        await test.step('10. Verify ACCOUNT CREATED! and click Continue', async () => {
            await expect(signupPage.accountCreatedText).toBeVisible();
            await signupPage.continueBtn.click();
            await signupPage.waitForPageLoad();
        });

        await test.step('11. Verify Logged in as username at top', async () => {
            await expect(signupPage.loggedInAsText).toBeVisible();
        });

        await test.step('12-13. Click Cart button and Proceed To Checkout', async () => {
            await cartPage.cartBtn.click();
            await cartPage.proceedToCheckoutBtn.click();
            await cartPage.waitForPageLoad();
        });

        await test.step('14. Verify Address Details and Review Your Order', async () => {
            await expect(checkoutPage.deliveryAddressLines).toBeVisible();
        });

        await test.step('15. Enter description in comment and click Place Order', async () => {
            await checkoutPage.commentTextarea.fill('Test order comment');
            await checkoutPage.placeOrderBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('16-17. Enter payment details and click Pay and Confirm Order', async () => {
            await checkoutPage.fillPaymentDetails('Test User', '4111111111111111', '123', '12', '2027');
            await checkoutPage.payAndConfirmBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('18. Verify success message', async () => {
            await expect(checkoutPage.orderPlacedSuccessMsg).toBeVisible();
        });

        await test.step('19-20. Delete account and verify', async () => {
            await checkoutPage.clickDeleteAccount();
            await expect(signupPage.accountDeletedText).toBeVisible();
        });
    });

});
