import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { SignupPage } from '../../pages/signupPage';
import { generateUser } from '../../data/dataGenerator';
import { APIUtils } from '../../utils/apiUtils';

test.describe('Authentication Tests', () => {

    test('Test Case 2: Login User with correct email and password', async ({ page, request }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const apiUtils = new APIUtils(request);
        const user = generateUser();

        // Setup: Create user via API
        await test.step('Setup: Create User via API', async () => {
            await apiUtils.createAccount(user);
        });

        await test.step('1. Launch browser & 2. Navigate to url', async () => {
            await homePage.goto();
        });

        await test.step('3. Verify that home page is visible successfully', async () => {
            await expect(page).toHaveURL('/');
        });

        await test.step('4. Click on Signup / Login button', async () => {
            await homePage.clickSignupLogin();
        });

        await test.step('5. Verify Login to your account is visible', async () => {
            await expect(loginPage.loginToYourAccountText).toBeVisible();
        });

        await test.step('6. Enter correct email address and password & 7. Click login button', async () => {
            await loginPage.loginUser(user.email, user.password);
        });

        await test.step('8. Verify that Logged in as username is visible', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
            await expect(homePage.loggedInAsText).toContainText(user.name);
        });

        await test.step('9. Click Delete Account button', async () => {
            await homePage.clickDeleteAccount();
        });

        await test.step('10. Verify that ACCOUNT DELETED! is visible', async () => {
            await expect(signupPage.accountDeletedText).toBeVisible();
        });
    });

});
