import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
    readonly cartRows: Locator;
    readonly proceedToCheckoutBtn: Locator;
    readonly registerLoginModalBtn: Locator;
    readonly emptyCartMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.proceedToCheckoutBtn = page.locator('text=Proceed To Checkout');
        this.registerLoginModalBtn = page.locator('.modal-body').locator('a', { hasText: 'Register / Login' });
        this.emptyCartMsg = page.locator('#empty_cart');
    }

    async getCartItemQuantity(rowIndex: number): Promise<string> {
        return await this.cartRows.nth(rowIndex).locator('.cart_quantity button').innerText();
    }

    getCartPrice(rowIndex: number): Locator {
        return this.cartRows.nth(rowIndex).locator('.cart_price');
    }

    getCartQuantity(rowIndex: number): Locator {
        return this.cartRows.nth(rowIndex).locator('.cart_quantity');
    }

    getCartTotal(rowIndex: number): Locator {
        return this.cartRows.nth(rowIndex).locator('.cart_total');
    }

    async removeCartItem(rowIndex: number) {
        await this.cartRows.nth(rowIndex).locator('.cart_quantity_delete').click();
    }
}
