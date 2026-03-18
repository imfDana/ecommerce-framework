import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    readonly signupLoginBtn: Locator;
    readonly contactUsBtn: Locator;
    readonly productsBtn: Locator;
    readonly testCasesBtn: Locator;
    readonly homePageItems: Locator;
    readonly wrongCredentialsError: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginBtn = page.locator('header').locator('a[href="/login"]');
        this.contactUsBtn = page.getByRole('listitem').filter({ hasText: 'Contact us' });
        this.productsBtn = page.locator('header').locator('a[href="/products"]');
        this.testCasesBtn = page.locator('header').locator('a[href="/test_cases"]').first();
        this.homePageItems = page.getByRole('heading', { name: 'Features Items' });
        this.wrongCredentialsError = page.locator('text=Your email or password is incorrect!');
    }

    async goto() {
        await this.page.goto('/');
    }

    async navigateToHomePageSuccessfuly() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL(/.*automationexercise\.com\/?$/);
        await expect(this.homePageItems).toBeVisible();
        await this.waitForPageLoad();
    }

    async clickSignupLogin() {
        await this.signupLoginBtn.click();
        await this.waitForPageLoad();
    }
}
