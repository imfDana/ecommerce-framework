import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
    readonly deliveryAddressLines: Locator;
    readonly billingAddressLines: Locator;
    readonly commentTextarea: Locator;
    readonly placeOrderBtn: Locator;
    
    // Payment Elements
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmBtn: Locator;
    readonly orderPlacedSuccessMsg: Locator;
    readonly downloadInvoiceBtn: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddressLines = page.locator('#address_delivery .address_address1').nth(1);
        this.billingAddressLines = page.locator('#address_invoice .address_address1').nth(1);
        this.commentTextarea = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.locator('a[href="/payment"]');

        // Payment
        this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('[data-qa="card-number"]');
        this.cvcInput = page.locator('[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
        this.payAndConfirmBtn = page.locator('[data-qa="pay-button"]');
        this.orderPlacedSuccessMsg = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('a.check_out', { hasText: 'Download Invoice' });
        this.continueBtn = page.locator('[data-qa="continue-button"]');
    }

    async fillPaymentDetails(name: string, card: string, cvc: string, month: string, year: string) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(card);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(month);
        await this.expiryYearInput.fill(year);
    }
}
