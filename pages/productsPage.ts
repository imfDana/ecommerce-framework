import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductsPage extends BasePage {
    readonly allProductsTitle: Locator;
    readonly allBrandsTitle: Locator;
    readonly poloBrand: Locator;
    readonly hmBrand: Locator;
    readonly searchInput: Locator;
    readonly searchBtn: Locator;
    readonly searchedProductsTitle: Locator;
    readonly productList: Locator;
    readonly firstProductViewLink: Locator;
    readonly brandLinks: Locator;
    readonly featuresItems: Locator;

    // Categories
    readonly categoryTitle: Locator;
    readonly womenCategory: Locator;
    readonly dressCategory: Locator;
    readonly menCategory: Locator;
    readonly tshirtCategory: Locator;

    // Common product elements
    readonly firstProductHover: Locator;
    readonly firstProductAddToCartBtn: Locator;
    readonly secondProductHover: Locator;
    readonly secondProductAddToCartBtn: Locator;

    // Product Detail Elements
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly quantityInput: Locator;
    readonly addToCartBtn: Locator;

    // Review Elements
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewMessageInput: Locator;
    readonly reviewSubmitBtn: Locator;
    readonly reviewSuccessMsg: Locator;
    readonly writeYourReviewText: Locator;

    constructor(page: Page) {
        super(page);
        this.allProductsTitle = page.locator('text=All Products');

        this.searchInput = page.locator('#search_product');
        this.searchBtn = page.locator('#submit_search');
        this.searchedProductsTitle = page.locator('text=Searched Products');
        this.productList = page.locator('.features_items .col-sm-4');
        this.firstProductViewLink = page.locator('.choose a').first();
        this.allBrandsTitle = page.getByRole('heading', { name: 'Brands' });
        this.poloBrand = page.getByRole('link', { name: '(6) Polo' });
        this.hmBrand = page.getByRole('link', { name: '(5) H&M' });
        this.brandLinks = page.locator('.brands-name a');
        this.featuresItems = page.locator('.features_items');

        // Categories
        this.categoryTitle = page.locator('h2.title');
        this.womenCategory = page.locator('a[href="#Women"]');
        this.dressCategory = page.locator('a[href="/category_products/1"]');
        this.menCategory = page.locator('a[href="#Men"]');
        this.tshirtCategory = page.locator('a[href="/category_products/3"]');

        // Product interaction
        this.firstProductHover = page.locator('.productinfo.text-center').first();
        this.firstProductAddToCartBtn = page.locator('.overlay-content .add-to-cart').first();
        this.secondProductHover = page.locator('.productinfo.text-center').nth(1);
        this.secondProductAddToCartBtn = page.locator('.overlay-content .add-to-cart').nth(1);

        // Product Details
        this.productName = page.locator('.product-information h2');
        this.productCategory = page.locator('.product-information p').filter({ hasText: 'Category' });
        this.productPrice = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability' });
        this.productCondition = page.locator('.product-information p').filter({ hasText: 'Condition' });
        this.productBrand = page.locator('.product-information p').filter({ hasText: 'Brand' });
        this.quantityInput = page.locator('#quantity');
        this.addToCartBtn = page.locator('button.cart');

        // Review
        this.reviewNameInput = page.locator('#name');
        this.reviewEmailInput = page.locator('#email');
        this.reviewMessageInput = page.locator('#review');
        this.reviewSubmitBtn = page.locator('#button-review');
        this.reviewSuccessMsg = page.locator('text=Thank you for your review.');
        this.writeYourReviewText = page.locator('text=Write Your Review');
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchBtn.click();
        await this.waitForPageLoad();
    }

    async selectRandomBrand(excludeBrandName?: string): Promise<string> {
        // 1. Aseguramos que los enlaces estén visibles
        const brandLinks = this.brandLinks;
        await brandLinks.first().waitFor({ state: 'visible' });

        // 2. Si hay que excluir una marca, filtramos el locator directamente
        let targetLocators = brandLinks;
        if (excludeBrandName) {
            // Filtramos para ignorar el elemento que contiene el nombre de la marca excluida
            targetLocators = brandLinks.filter({ hasNotText: excludeBrandName });
        }

        const count = await targetLocators.count();
        if (count === 0) throw new Error(`No brands found available (excluding: ${excludeBrandName})`);

        // 3. Elegimos al azar entre los que quedaron
        const randomIndex = Math.floor(Math.random() * count);
        const selectedElement = targetLocators.nth(randomIndex);

        // 4. Extraemos el texto limpio (sacamos el "(6)")
        const fullText = await selectedElement.innerText();
        const brandName = fullText.replace(/^\(\d+\)\s*/, '').trim();

        // 5. Click y espera
        await selectedElement.click();
        await this.waitForPageLoad();

        return brandName;
    }

    async addFirstProductToCart() {
        await this.firstProductHover.hover();
        await this.firstProductAddToCartBtn.click();
    }

    async addSecondProductToCart() {
        await this.secondProductHover.hover();
        await this.secondProductAddToCartBtn.click();
    }
}
