import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';

test.describe('Cart Features Tests', () => {

    test('Test Case 12: Add Products in Cart', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Click Products button', async () => {
            await homePage.productsBtn.click();
        });

        await test.step('5. Hover over first product and click Add to cart', async () => {
            await productsPage.addFirstProductToCart();
        });

        await test.step('6. Click Continue Shopping button', async () => {
            await productsPage.continueShoppingBtn.click();
        });

        await test.step('7. Hover over second product and click Add to cart', async () => {
            await productsPage.addSecondProductToCart();
        });

        await test.step('8. Click View Cart button', async () => {
            await productsPage.viewCartLink.click();
        });

        await test.step('9. Verify both products are added to Cart & 10. Verify prices, quantity', async () => {
            await expect(cartPage.cartRows).toHaveCount(2);
            await expect(cartPage.getCartPrice(0)).toBeVisible();
            await expect(cartPage.getCartQuantity(0)).toBeVisible();
            await expect(cartPage.getCartTotal(0)).toBeVisible();
        });

    });

    test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Click View Product for any product on home page & 5. Verify product detail is opened', async () => {
            await productsPage.firstProductViewLink.click();
            await expect(page.url()).toContain('/product_details');
        });

        await test.step('6. Increase quantity to 4', async () => {
            await productsPage.quantityInput.fill('4');
        });

        await test.step('7. Click Add to cart button & 8. Click View Cart button', async () => {
            await productsPage.addToCartBtn.click();
            await productsPage.viewCartLink.click();
        });

        await test.step('9. Verify that product is displayed in cart page with exact quantity', async () => {
            const qty = await cartPage.getCartItemQuantity(0);
            expect(qty).toBe('4');
        });
    });

    test('Test Case 17: Remove Products From Cart', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Add products to cart & 5. Click Cart button', async () => {
            const productsPage = new ProductsPage(page);
            await productsPage.addFirstProductToCart();
            await productsPage.viewCartLink.click();
        });

        await test.step('6. Verify that cart page is displayed', async () => {
            await expect(page).toHaveURL(/.*view_cart/);
        });

        await test.step('7. Click X button corresponding to particular product', async () => {
            await cartPage.removeCartItem(0);
        });

        await test.step('8. Verify that product is removed from the cart', async () => {
            await expect(cartPage.emptyCartMsg).toBeVisible();
        });
    });

    test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Scroll to bottom of page & Verify RECOMMENDED ITEMS are visible', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await expect(homePage.recommendedItemsTitle).toBeVisible();
        });

        await test.step('5. Click on Add To Cart on Recommended product', async () => {
            await homePage.recommendedAddToCartBtn.click();
        });

        await test.step('6. Click on View Cart button & 7. Verify product is displayed in cart page', async () => {
            await homePage.viewCartLink.click();
            const cartPage = new CartPage(page);
            await expect(cartPage.cartRows).toHaveCount(1);
        });
    });
});
