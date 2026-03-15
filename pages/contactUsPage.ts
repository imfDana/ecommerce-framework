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
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitBtn = page.locator('[data-qa="submit-button"]');
        this.successMsg = page.locator('.status.alert-success');
        this.homeBtn = page.locator('.btn-success');
    }

    async fillContactForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }
}
