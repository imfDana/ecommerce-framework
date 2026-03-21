import { Page, Locator, expect, Dialog } from '@playwright/test';
import { BasePage } from './basePage';

export class ContactUsPage extends BasePage {
    readonly getInTouchText: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly uploadFileInput: Locator;
    readonly submitBtn: Locator;
    readonly homeBtn: Locator;
    readonly successMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.getInTouchText = page.getByRole('heading', { name: 'Get In Touch' });
        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.subjectInput = page.getByTestId('subject');
        this.messageInput = page.getByTestId('message');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitBtn = page.getByTestId('submit-button');
        this.homeBtn = page.locator('#contact-page').getByRole('link', { name: ' Home' }).or(page.locator('a.btn-success'));
        this.successMsg = page.locator('.status.alert-success');
    }

    /** Fills the contact form with provided details. */
    async fillContactForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    /** Submits the form and handles the browser confirmation dialog. */
    async submitForm() {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.submitBtn.click();
    }

    /** Clicks the Home button on the success page and waits for navigation. */
    async clickHome() {
        await this.homeBtn.click();
        await this.waitForPageLoad();
    }
}
