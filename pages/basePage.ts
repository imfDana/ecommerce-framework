import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly loggedInAsText: Locator;
    readonly deleteAccountBtn: Locator;
    readonly logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loggedInAsText = page.locator('text=Logged in as');
        this.deleteAccountBtn = page.locator('a[href="/delete_account"]');
        this.logoutBtn = page.locator('a[href="/logout"]');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Bypass any full-screen vignette ads
    async bypassAds() {
        if (this.page.url().includes('#google_vignette')) {
            await this.page.goto('https://automationexercise.com/');
            await this.waitForPageLoad();
        }
    }

    async clickLogout() {
        await this.logoutBtn.click();
        await this.waitForPageLoad();
    }

    async clickDeleteAccount() {
        await this.deleteAccountBtn.click();
        await this.waitForPageLoad();
    }
}
