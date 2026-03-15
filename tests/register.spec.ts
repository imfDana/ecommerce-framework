import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';
import { generateUser } from '../data/dataGenerator';

test.describe('Authentication Tests', () => {

    test('Test Case 1: Register User', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const user = generateUser();

        // 1. Launch browser & 2. Navigate to url
        await homePage.goto();

        // 3. Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(page.locator('.features_items')).toBeVisible();

        // 4. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 5. Verify 'New User Signup!' is visible
        // 6. Enter name and email address & 7. Click 'Signup' button
        await loginSignupPage.signupInitial(user.name, user.email);

        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.locator('text=Enter Account Information')).toBeVisible();

        // 9. Fill details & 10. Select checkboxes & 12. Fill address details
        // Note: For simplicity, the methods handle all the inputs
        await loginSignupPage.fillSignupForm(user);

        // 13. Click 'Create Account button'
        await loginSignupPage.clickCreateAccount();

        // 14. Verify that 'ACCOUNT CREATED!' is visible
        await expect(page.getByTestId('account-created')).toBeVisible();

        // 15. Click 'Continue' button
        await page.getByTestId('continue-button').click();
        await homePage.waitForPageLoad();

        // 16. Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInAsText).toBeVisible();
        await expect(homePage.loggedInAsText).toContainText(user.name);

        // 17. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(page.getByTestId('account-deleted')).toBeVisible();
        await page.getByTestId('continue-button').click();
    });

});
