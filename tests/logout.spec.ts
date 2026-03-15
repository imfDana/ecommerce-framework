import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';
import { generateUser } from '../data/dataGenerator';
import { APIUtils } from '../utils/apiUtils';

test.describe('Authentication Tests', () => {

    test('Test Case 4: Logout User', async ({ page, request }) => {
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const apiUtils = new APIUtils(request);
        const user = generateUser();

        // Setup: Create user via API first
        await test.step('Setup: Create User via API', async () => {
            await apiUtils.createAccount(user);
        });

        await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('https://automationexercise.com/');
            await expect(page.locator('.features_items')).toBeVisible();
        });

        await test.step('4. Click on Signup / Login button & 5. Verify Login is visible', async () => {
            await homePage.clickSignupLogin();
            await expect(loginSignupPage.loginToYourAccountText).toBeVisible();
        });

        await test.step('6. Enter correct email address and password & 7. Click login button', async () => {
            await loginSignupPage.login(user.email, user.password);
        });

        await test.step('8. Verify that Logged in as username is visible', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
            await expect(homePage.loggedInAsText).toContainText(user.name);
        });

        await test.step('9. Click Logout button', async () => {
            await homePage.clickLogout();
        });

        await test.step('10. Verify that user is navigated to login page', async () => {
            await expect(page).toHaveURL('https://automationexercise.com/login');
            await expect(loginSignupPage.loginToYourAccountText).toBeVisible();
        });

        // Cleanup: Use API to delete the account since we are logged out in the UI
        await test.step('Cleanup: Delete user via API', async () => {
            await apiUtils.deleteAccount(user.email, user.password);
        });
    });

});
