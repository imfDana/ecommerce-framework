import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { generateUser } from '../../data/dataGenerator';
import { APIUtils } from '../../utils/apiUtils';

test.describe('Authentication Tests', () => {

    test('Test Case 4: Logout User', async ({ page, request }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const apiUtils = new APIUtils(request);
        const user = generateUser();

        await test.step('Setup: Create User via API', async () => {
            await apiUtils.createAccount(user);
        });

        await test.step('1. Launch browser & 2. Navigate to url', async () => {
            await homePage.goto();
        });

        await test.step('4. Click on Signup / Login button', async () => {
            await homePage.clickSignupLogin();
        });

        await test.step('6. Enter correct email address and password & 7. Click login button', async () => {
            await loginPage.loginUser(user.email, user.password);
        });

        await test.step('8. Verify that Logged in as username is visible', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
        });

        await test.step('9. Click Logout button', async () => {
            await homePage.clickLogout();
        });

        await test.step('10. Verify that user is navigated to login page', async () => {
            await expect(page).toHaveURL('https://automationexercise.com/login');
        });

        await test.step('Cleanup: Delete user via API', async () => {
            await apiUtils.deleteAccount(user.email, user.password);
        });
    });

});
