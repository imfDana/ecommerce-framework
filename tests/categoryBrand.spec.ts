import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { ProductsPage } from '../pages/productsPage';

test.describe('Category & Brand Tests', () => {

    test('Test Case 18: View Category Products', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
        });

        await test.step('4. Click on Women category & 5. Click on Dress sub-category', async () => {
            await page.locator('a[href="#Women"]').click();
            await page.locator('a[href="/category_products/1"]').click();
        });

        await test.step('6. Verify that category page is displayed and confirm text WOMEN - DRESS PRODUCTS', async () => {
            await expect(page.locator('h2.title', { hasText: 'Women - Dress Products' })).toBeVisible();
        });

        await test.step('7. On left side bar, click on any sub-category link of Men category', async () => {
            await page.locator('a[href="#Men"]').click();
            await page.locator('a[href="/category_products/3"]').click();
        });

        await test.step('8. Verify that user is navigated to that category page', async () => {
            await expect(page.locator('h2.title', { hasText: 'Men - Tshirts Products' })).toBeVisible();
        });
    });

    test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);

        let firstBrandSelected: string;
        let secondBrandSelected: string;

        await test.step('1-3 Setup', async () => {
            await homePage.goto();
            await homePage.productsBtn.click();
        });

        await test.step('4. Verify that Brands are visible on left side bar', async () => {
            await expect(productsPage.allBrandsTitle).toBeVisible();
        });

        await test.step('5. Click on first brand & 6. Verify navigation', async () => {
            firstBrandSelected = await productsPage.selectRandomBrand();
            // Verificamos que estamos en la página de marcas genérica
            await expect(page).toHaveURL(/.*brand_products\/.+/);
            await expect(page.locator('.features_items')).toBeVisible();
        });

        await test.step('7. Click on any OTHER brand link', async () => {
            secondBrandSelected = await productsPage.selectRandomBrand(firstBrandSelected);
            expect(secondBrandSelected).not.toBe(firstBrandSelected);
        });

        await test.step('8. Verify navigation to the second brand page', async () => {
            // Validamos que la URL contenga el nombre de la nueva marca
            // Usamos una expresión regular para que sea menos sensible a la codificación exacta
            const regex = new RegExp(`brand_products/${secondBrandSelected}`, 'i');
            await expect(page).toHaveURL(regex);
            await expect(page.locator('.features_items')).toBeVisible();
        });
    });
});

