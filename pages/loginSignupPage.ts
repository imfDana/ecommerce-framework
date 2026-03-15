import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { UserData } from '../data/dataGenerator';

export class LoginSignupPage extends BasePage {
    // Signup Elements
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupBtn: Locator;
    readonly newUserSignupText: Locator;

    // Signup Form Elements
    readonly genderRadio: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountBtn: Locator;

    // Login Elements
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginBtn: Locator;
    readonly loginToYourAccountText: Locator;

    constructor(page: Page) {
        super(page);
        // Signup
        this.signupNameInput = page.getByTestId('signup-name');
        this.signupEmailInput = page.getByTestId('signup-email');
        this.signupBtn = page.getByTestId('signup-button');
        this.newUserSignupText = page.getByRole('heading', { name: 'New User Signup!' });

        // Form
        this.genderRadio = page.locator('#id_gender1');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.daySelect = page.locator('[data-qa="days"]');
        this.monthSelect = page.locator('[data-qa="months"]');
        this.yearSelect = page.locator('[data-qa="years"]');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOffersCheckbox = page.locator('#optin');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountBtn = page.locator('[data-qa="create-account"]');

        // Login
        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginBtn = page.locator('[data-qa="login-button"]');
        this.loginToYourAccountText = page.locator('text=Login to your account');
    }

    async signupInitial(name: string, email: string) {
        await expect(this.newUserSignupText).toBeVisible();
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupBtn.click();
        await this.waitForPageLoad();
    }

    async fillSignupForm(user: UserData) {
        // Assume gender is 'Mr' for now
        await this.genderRadio.check();
        await this.passwordInput.fill(user.password);
        await this.daySelect.selectOption(user.birth_date);
        await this.monthSelect.selectOption(user.birth_month);
        await this.yearSelect.selectOption(user.birth_year);
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();
        await this.firstNameInput.fill(user.firstname);
        await this.lastNameInput.fill(user.lastname);
        await this.companyInput.fill(user.company);
        await this.address1Input.fill(user.address1);
        await this.address2Input.fill(user.address2);
        await this.countrySelect.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobile_number);
    }

    async clickCreateAccount() {
        await this.createAccountBtn.click();
        await this.waitForPageLoad();
    }

    async login(email: string, password: string) {
        await expect(this.loginToYourAccountText).toBeVisible();
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginBtn.click();
        await this.waitForPageLoad();
    }
}
