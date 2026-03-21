import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';
import { LoginPage } from '../../pages/loginPage';
import { generateUser } from '../../data/dataGenerator';
import { APIUtils } from '../../utils/apiUtils';

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page, request }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const apiUtils = new APIUtils(request);
    const user = generateUser();

    await apiUtils.createAccount(user);

    await test.step('1-4. Navigate to Products', async () => {
        await homePage.goto();
        await homePage.productsBtn.click();
    });

    await test.step('5. Search for product', async () => {
        await productsPage.searchProduct('Top');
    });

    await test.step('8. Add to cart', async () => {
        await productsPage.addFirstProductToCart();
        await productsPage.continueShoppingBtn.click();
    });

    await test.step('9. Verify in cart', async () => {
        await cartPage.cartBtn.click();
        await expect(cartPage.cartRows).toHaveCount(1);
    });

    await test.step('10. Login', async () => {
        await homePage.clickSignupLogin();
        await loginPage.loginUser(user.email, user.password);
    });

    await test.step('11-12. Verify in cart after login', async () => {
        await cartPage.cartBtn.click();
        await expect(cartPage.cartRows).toHaveCount(1);
    });

    await test.step('Cleanup', async () => {
        await apiUtils.deleteAccount(user.email, user.password);
    });
});
