import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginBtn: Locator;
    readonly loginToYourAccountText: Locator;
    readonly wrongCredentialsError: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginBtn = page.getByTestId('login-button');
        this.loginToYourAccountText = page.locator('text=Login to your account');
        this.wrongCredentialsError = page.locator('text=Your password is incorrect');
    }

    async loginUser(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginBtn.click();
        await this.waitForPageLoad();
    }
}
