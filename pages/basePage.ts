import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly loggedInAsText: Locator;
    readonly deleteAccountBtn: Locator;
    readonly logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loggedInAsText = page.locator('header').locator('text=Logged in as');
        this.deleteAccountBtn = page.getByRole('listitem').filter({ hasText: 'Delete Account' });
        this.logoutBtn = page.getByRole('listitem').filter({ hasText: 'Logout' });
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
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
