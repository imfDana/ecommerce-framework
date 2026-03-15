import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { ProductsPage } from '../pages/productsPage';

test.describe('Products Tests', () => {

    test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);

        await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Click on Products button', async () => {
            await homePage.productsBtn.click();
        });

        await test.step('5. Verify user is navigated to ALL PRODUCTS page successfully & 6. The products list is visible', async () => {
            await expect(page).toHaveURL('https://automationexercise.com/products');
            await expect(productsPage.allProductsTitle).toBeVisible();
            await expect(productsPage.productList.first()).toBeVisible();
        });

        await test.step('7. Click on View Product of first product', async () => {
            await productsPage.firstProductViewLink.click();
        });

        await test.step('8. User is landed to product detail page & 9. Verify details', async () => {
            await expect(page.url()).toContain('/product_details/1');
            await expect(productsPage.productName).toBeVisible();
            await expect(productsPage.productCategory).toBeVisible();
            await expect(productsPage.productPrice).toBeVisible();
            await expect(productsPage.productAvailability).toBeVisible();
            await expect(productsPage.productCondition).toBeVisible();
            await expect(productsPage.productBrand).toBeVisible();
        });
    });

    test('Test Case 9: Search Product', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Click on Products button & 5. Verify ALL PRODUCTS', async () => {
            await homePage.productsBtn.click();
            await expect(page).toHaveURL('https://automationexercise.com/products');
        });

        await test.step('6. Enter product name and click search', async () => {
            await productsPage.searchProduct('Top');
        });

        await test.step('7. Verify SEARCHED PRODUCTS is visible & 8. Verify all related products are visible', async () => {
            await expect(productsPage.searchedProductsTitle).toBeVisible();
            await expect(productsPage.productList.first()).toBeVisible();
        });
    });

    test('Test Case 21: Add review on product', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
        });

        await test.step('4. Click on Products button & 5. Click View Product', async () => {
            await homePage.productsBtn.click();
            await productsPage.firstProductViewLink.click();
        });

        await test.step('6. Verify Write Your Review is visible', async () => {
            await expect(page.locator('text=Write Your Review')).toBeVisible();
        });

        await test.step('7. Enter name, email and review & 8. Click Submit', async () => {
            await productsPage.reviewNameInput.fill('Reviewer');
            await productsPage.reviewEmailInput.fill('reviewer@test.com');
            await productsPage.reviewMessageInput.fill('This is a great product review.');
            await productsPage.reviewSubmitBtn.click();
        });

        await test.step('9. Verify success message Thank you for your review.', async () => {
            await expect(productsPage.reviewSuccessMsg).toBeVisible();
        });
    });

});
