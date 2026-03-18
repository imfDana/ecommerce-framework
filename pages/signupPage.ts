import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { UserData } from '../data/dataGenerator';

export class SignupPage extends BasePage {
    // ── Initial signup section (Login/Signup page) ──────────────────────────
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupBtn: Locator;
    readonly newUserSignupText: Locator;

    // ── Enter Account Information ────────────────────────────────────────────
    readonly enterAccountInfoText: Locator;
    readonly genderMrRadio: Locator;
    readonly genderMrsRadio: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;

    // ── Address Details ──────────────────────────────────────────────────────
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

    // ── Submit & confirmation ────────────────────────────────────────────────
    readonly createAccountBtn: Locator;
    readonly accountCreatedText: Locator;
    readonly continueBtn: Locator;
    // // ── Delete Account ───────────────────────────────────────────────────────
    // readonly deleteAccountBtn: Locator;
    readonly accountDeletedText: Locator;

    // error messajes
    readonly emailAlreadyExistError: Locator;

    constructor(page: Page) {
        super(page);

        // Initial signup form
        this.signupNameInput = page.getByTestId('signup-name');
        this.signupEmailInput = page.getByTestId('signup-email');
        this.signupBtn = page.getByTestId('signup-button');
        this.newUserSignupText = page.getByRole('heading', { name: 'New User Signup!' });

        // Account information form
        this.enterAccountInfoText = page.getByText('Enter Account Information');
        this.genderMrRadio = page.locator('#id_gender1');
        this.genderMrsRadio = page.locator('#id_gender2');
        this.passwordInput = page.getByTestId('password');
        this.daySelect = page.getByTestId('days');
        this.monthSelect = page.getByTestId('months');
        this.yearSelect = page.getByTestId('years');
        this.newsletterCheckbox = page.getByText('Sign up for our newsletter!');
        this.specialOffersCheckbox = page.locator('#optin');

        // Address details
        this.firstNameInput = page.getByTestId('first_name');
        this.lastNameInput = page.getByTestId('last_name');
        this.companyInput = page.getByTestId('company');
        this.address1Input = page.getByTestId('address');
        this.address2Input = page.getByTestId('address2');
        this.countrySelect = page.getByTestId('country');
        this.stateInput = page.getByTestId('state');
        this.cityInput = page.getByTestId('city');
        this.zipcodeInput = page.getByTestId('zipcode');
        this.mobileNumberInput = page.getByTestId('mobile_number');

        // Submit & confirmation
        this.createAccountBtn = page.getByTestId('create-account');
        this.accountCreatedText = page.getByTestId('account-created');
        this.continueBtn = page.getByTestId('continue-button');
        // Delete Account
        this.accountDeletedText = page.getByTestId('account-deleted');

        // error messages
        this.emailAlreadyExistError = page.getByText('Email Address already exist!');
    }

    /** Fills the initial name + email fields on the Login/Signup page and submits. */
    async signupInitial(name: string, email: string) {
        await expect(this.newUserSignupText).toBeVisible();
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupBtn.click();
        await this.waitForPageLoad();
    }

    /** Fills every field of the full account information + address form. */
    async fillSignupForm(user: UserData) {
        await expect(this.enterAccountInfoText).toBeVisible();
        await this.genderMrRadio.waitFor({ state: 'visible' });
        await this.genderMrRadio.check();

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

    /** Clicks the 'Create Account' button and waits for page load. */
    async clickCreateAccount() {
        await this.createAccountBtn.click();
        await this.waitForPageLoad();
    }
}
