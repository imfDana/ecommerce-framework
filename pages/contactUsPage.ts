import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ContactUsPage extends BasePage {
    readonly getInTouchText: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly uploadFileInput: Locator;
    readonly submitBtn: Locator;
    readonly successMsg: Locator;
    readonly homeBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.getInTouchText = page.locator('text=GET IN TOUCH');
        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.subjectInput = page.getByTestId('subject');
        this.messageInput = page.getByTestId('message');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitBtn = page.getByTestId('submit-button');
        // Handle locator strictness and dynamics
        this.successMsg = page.locator('.status.alert-success').first();
        this.homeBtn = page.locator('a.btn-success');
    }

    async fillContactForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }
}
