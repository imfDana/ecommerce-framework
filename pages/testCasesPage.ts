import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class TestCasesPage extends BasePage {
    readonly testCasesTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.testCasesTitle = page.locator('text=Below is the list of test Cases for you to practice the Automation');
    }
}
