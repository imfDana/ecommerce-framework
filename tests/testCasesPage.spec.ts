import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
        await homePage.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');
    });

    await test.step('4. Click on Test Cases button', async () => {
        await homePage.testCasesBtn.click();
    });

    await test.step('5. Verify user is navigated to test cases page successfully', async () => {
        await expect(page).toHaveURL('https://automationexercise.com/test_cases');
        await expect(page.locator('text=Below is the list of test Cases for you to practice the Automation')).toBeVisible();
    });
});
