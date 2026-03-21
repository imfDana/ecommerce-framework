import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly loggedInAsText: Locator;
    readonly deleteAccountBtn: Locator;
    readonly logoutBtn: Locator;
    readonly subscriptionTitle: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscriptionSubmitBtn: Locator;
    readonly subscriptionSuccessMsg: Locator;
    readonly scrollUpBtn: Locator;
    readonly carouselTitle: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingBtn: Locator;
    readonly cartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loggedInAsText = page.locator('header').locator('text=Logged in as');
        this.deleteAccountBtn = page.getByRole('listitem').filter({ hasText: 'Delete Account' });
        this.logoutBtn = page.getByRole('listitem').filter({ hasText: 'Logout' });
        this.subscriptionTitle = page.locator('h2:has-text("Subscription")');
        this.subscriptionEmailInput = page.locator('#susbscribe_email');
        this.subscriptionSubmitBtn = page.locator('#subscribe');
        this.subscriptionSuccessMsg = page.locator('.alert-success');
        this.scrollUpBtn = page.locator('#scrollUp');
        this.carouselTitle = page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
        this.viewCartLink = page.locator('u', { hasText: 'View Cart' });
        this.continueShoppingBtn = page.locator('button.btn-success', { hasText: 'Continue Shopping' });
        this.cartBtn = page.getByRole('listitem').filter({ hasText: 'Cart' });
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

    async subscribe(email: string) {
        await this.subscriptionEmailInput.fill(email);
        await this.subscriptionSubmitBtn.click();
    }
}
