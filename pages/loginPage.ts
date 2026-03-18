import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginTopBarBtn: Locator;
    readonly loginFormBtn: Locator;
    readonly loginToYourAccountText: Locator;
    readonly wrongCredentialsError: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginTopBarBtn = page.getByRole('listitem').filter({ hasText: 'Signup / Login' });
        this.loginFormBtn = page.getByTestId('login-button');
        this.loginToYourAccountText = page.locator('text=Login to your account');
        this.wrongCredentialsError = page.getByText('Your email or password is');
    }

    async loginUser(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginFormBtn.click();
        await this.waitForPageLoad();
    }
}
