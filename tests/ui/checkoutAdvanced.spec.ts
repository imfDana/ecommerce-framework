import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { LoginPage } from '../../pages/loginPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { ProductsPage } from '../../pages/productsPage';
import { generateUser } from '../../data/dataGenerator';

test.use({ storageState: undefined });

test.describe('Advanced Checkout Tests', () => {

    test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        await test.step('1-3. Launch browser, navigate to home page and verify', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Click Signup / Login button', async () => {
            await homePage.clickSignupLogin();
        });

        await test.step('5. Fill all details in Signup and create account', async () => {
            await signupPage.signupInitial(user.name, user.email);
            await signupPage.fillSignupForm(user);
            await signupPage.clickCreateAccount();
        });

        await test.step('6. Verify ACCOUNT CREATED! and click Continue', async () => {
            await expect(signupPage.accountCreatedText).toBeVisible();
            await signupPage.continueBtn.click();
            await signupPage.waitForPageLoad();
        });

        await test.step('7. Verify Logged in as username at top', async () => {
            await expect(signupPage.loggedInAsText).toBeVisible();
        });

        await test.step('8. Add products to cart', async () => {
            await productsPage.addFirstProductToCart();
            await cartPage.continueShoppingBtn.click();
        });

        await test.step('9-10. Click Cart button and verify cart page is displayed', async () => {
            await cartPage.cartBtn.click();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step('11. Click Proceed To Checkout', async () => {
            await cartPage.proceedToCheckoutBtn.click();
            await cartPage.waitForPageLoad();
        });

        await test.step('12. Verify Address Details and Review Your Order', async () => {
            await expect(checkoutPage.deliveryAddressLines).toBeVisible();
        });

        await test.step('13. Enter description in comment and click Place Order', async () => {
            await checkoutPage.commentTextarea.fill('Test order comment');
            await checkoutPage.placeOrderBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('14-15. Enter payment details and click Pay and Confirm Order', async () => {
            await checkoutPage.fillPaymentDetails('Test User', '4111111111111111', '123', '12', '2027');
            await checkoutPage.payAndConfirmBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('16. Verify success message', async () => {
            await expect(checkoutPage.orderPlacedSuccessMsg).toBeVisible();
        });

        await test.step('17-18. Delete account and verify', async () => {
            await checkoutPage.clickDeleteAccount();
            await expect(signupPage.accountDeletedText).toBeVisible();
        });
    });

    test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        // Create account via API to have a valid user to log into
        await test.step('Pre-condition: Create account, then logout', async () => {
            await homePage.goto();
            await homePage.clickSignupLogin();
            await signupPage.signupInitial(user.name, user.email);
            await signupPage.fillSignupForm(user);
            await signupPage.clickCreateAccount();
            await expect(signupPage.accountCreatedText).toBeVisible();
            await signupPage.continueBtn.click();
            await signupPage.waitForPageLoad();
            await signupPage.clickLogout();
        });

        await test.step('1-3. Launch browser, navigate to home page and verify', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Click Signup / Login button', async () => {
            await homePage.clickSignupLogin();
        });

        await test.step('5. Fill email, password and click Login button', async () => {
            await loginPage.loginUser(user.email, user.password);
        });

        await test.step('6. Verify Logged in as username at top', async () => {
            await expect(loginPage.loggedInAsText).toBeVisible();
        });

        await test.step('7. Add products to cart', async () => {
            await productsPage.addFirstProductToCart();
            await cartPage.continueShoppingBtn.click();
        });

        await test.step('8-9. Click Cart button and verify cart page is displayed', async () => {
            await cartPage.cartBtn.click();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step('10. Click Proceed To Checkout', async () => {
            await cartPage.proceedToCheckoutBtn.click();
            await cartPage.waitForPageLoad();
        });

        await test.step('11. Verify Address Details and Review Your Order', async () => {
            await expect(checkoutPage.deliveryAddressLines).toBeVisible();
        });

        await test.step('12. Enter description in comment and click Place Order', async () => {
            await checkoutPage.commentTextarea.fill('Test order comment');
            await checkoutPage.placeOrderBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('13-14. Enter payment details and click Pay and Confirm Order', async () => {
            await checkoutPage.fillPaymentDetails('Test User', '4111111111111111', '123', '12', '2027');
            await checkoutPage.payAndConfirmBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('15. Verify success message', async () => {
            await expect(checkoutPage.orderPlacedSuccessMsg).toBeVisible();
        });

        await test.step('16-17. Delete account and verify', async () => {
            await checkoutPage.clickDeleteAccount();
            await expect(signupPage.accountDeletedText).toBeVisible();
        });
    });

    test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUser();

        await test.step('1-3. Launch browser, navigate to home page and verify', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Click Signup / Login button', async () => {
            await homePage.clickSignupLogin();
        });

        await test.step('5. Fill all details in Signup and create account', async () => {
            await signupPage.signupInitial(user.name, user.email);
            await signupPage.fillSignupForm(user);
            await signupPage.clickCreateAccount();
        });

        await test.step('6. Verify ACCOUNT CREATED! and click Continue', async () => {
            await expect(signupPage.accountCreatedText).toBeVisible();
            await signupPage.continueBtn.click();
            await signupPage.waitForPageLoad();
        });

        await test.step('7. Verify Logged in as username at top', async () => {
            await expect(signupPage.loggedInAsText).toBeVisible();
        });

        await test.step('8. Add products to cart', async () => {
            await productsPage.addFirstProductToCart();
            await cartPage.continueShoppingBtn.click();
        });

        await test.step('9-10. Click Cart button and verify cart page is displayed', async () => {
            await cartPage.cartBtn.click();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step('11. Click Proceed To Checkout', async () => {
            await cartPage.proceedToCheckoutBtn.click();
            await cartPage.waitForPageLoad();
        });

        await test.step('12-13. Verify that the delivery and billing address match registration details', async () => {
            await expect(checkoutPage.deliveryAddressLines).toContainText(user.address1);
            await expect(checkoutPage.billingAddressLines).toContainText(user.address1);
        });

        await test.step('14-15. Delete account and verify', async () => {
            await checkoutPage.clickDeleteAccount();
            await expect(signupPage.accountDeletedText).toBeVisible();
        });
    });

    test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
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

        await test.step('19. Click Download Invoice button and verify invoice downloads', async () => {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                checkoutPage.downloadInvoiceBtn.click(),
            ]);
            expect(download.suggestedFilename()).toBeTruthy();
        });

        await test.step('20. Click Continue button', async () => {
            await checkoutPage.continueBtn.click();
            await checkoutPage.waitForPageLoad();
        });

        await test.step('21-22. Delete account and verify', async () => {
            await checkoutPage.clickDeleteAccount();
            await expect(signupPage.accountDeletedText).toBeVisible();
        });
    });

});
