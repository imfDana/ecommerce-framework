import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    readonly signupLoginBtn: Locator;
    readonly contactUsBtn: Locator;
    readonly productsBtn: Locator;
    readonly testCasesBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginBtn = page.locator('header').locator('a[href="/login"]');
        this.contactUsBtn = page.locator('header').locator('a[href="/contact_us"]');
        this.productsBtn = page.locator('header').locator('a[href="/products"]');
        this.testCasesBtn = page.locator('header').locator('a[href="/test_cases"]').first();
    }

    async goto() {
        await this.page.goto('https://automationexercise.com');
        await this.waitForPageLoad();
    }

    async clickSignupLogin() {
        await this.signupLoginBtn.click();
        await this.waitForPageLoad();
    }
}
