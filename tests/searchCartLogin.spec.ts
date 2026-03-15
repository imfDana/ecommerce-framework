import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { LoginSignupPage } from '../pages/loginSignupPage';
import { generateUser } from '../data/dataGenerator';
import { APIUtils } from '../utils/apiUtils';

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page, request }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const loginSignupPage = new LoginSignupPage(page);
    const apiUtils = new APIUtils(request);
    const user = generateUser();

    await test.step('Setup API', async () => {
        await apiUtils.createAccount(user);
    });

    await test.step('1-3 Setup & 4. Verify ALL PRODUCTS', async () => {
        await homePage.goto();
        await homePage.productsBtn.click();
        await expect(page).toHaveURL('https://automationexercise.com/products');
    });

    await test.step('5. Enter product name in search input and click search button', async () => {
        await productsPage.searchProduct('Top');
    });

    await test.step('6. Verify SEARCHED PRODUCTS is visible & 7. Verify all related products are visible', async () => {
        await expect(productsPage.searchedProductsTitle).toBeVisible();
    });

    await test.step('8. Add those products to cart', async () => {
        await page.locator('.productinfo.text-center').first().hover();
        await page.locator('.overlay-content .add-to-cart').first().click();
        await page.locator('button.btn-success', { hasText: 'Continue Shopping' }).click();
    });

    await test.step('9. Click Cart button and verify that products are visible in cart', async () => {
        await page.locator('a[href="/view_cart"]').first().click();
        await homePage.waitForPageLoad();
        await expect(cartPage.cartRows).toHaveCount(1);
    });

    await test.step('10. Click Signup / Login button and submit login details', async () => {
        await homePage.clickSignupLogin();
        await loginSignupPage.login(user.email, user.password);
    });

    await test.step('11. Again, go to Cart page & 12. Verify that those products are visible in cart after login as well', async () => {
        await page.locator('a[href="/view_cart"]').first().click();
        await homePage.waitForPageLoad();
        await expect(cartPage.cartRows).toHaveCount(1);
    });

    await test.step('Cleanup', async () => {
        await apiUtils.deleteAccount(user.email, user.password);
    });
});
