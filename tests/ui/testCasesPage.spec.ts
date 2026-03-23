import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { TestCasesPage } from '../../pages/testCasesPage';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    const homePage = new HomePage(page);
    const testCasesPage = new TestCasesPage(page);

    await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
        await homePage.navigateToHomePageSuccessfuly();
    });

    await test.step('4. Click on Test Cases button', async () => {
        await homePage.testCasesBtn.click();
    });

    await test.step('5. Verify user is navigated to test cases page successfully', async () => {
        await expect(page).toHaveURL('/test_cases');
        await expect(testCasesPage.testCasesTitle).toBeVisible();
    });
});
