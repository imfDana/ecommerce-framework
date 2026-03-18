import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { generateUser } from '../../data/dataGenerator';
import { APIUtils } from '../../utils/apiUtils';

test.describe('Authentication Tests', () => {

    test('Test Case 5: Register User with existing email', async ({ page, request }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const apiUtils = new APIUtils(request);
        const user = generateUser();

        // Setup: Create the user via API first so the email is considered "existing"
        await test.step('Setup: Create User via API', async () => {
            await apiUtils.createAccount(user);
        });

        await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('4. Click on Signup / Login button & 5. Verify New User Signup! is visible', async () => {
            await homePage.clickSignupLogin();
            await expect(signupPage.newUserSignupText).toBeVisible();
        });

        await test.step('6. Enter name and already registered email address & 7. Click Signup button', async () => {
            await signupPage.signupInitial(user.name, user.email);
        });

        await test.step('8. Verify error Email Address already exist! is visible', async () => {
            await expect(signupPage.emailAlreadyExistError).toBeVisible();
        });

        // Cleanup: Delete the account we created
        await test.step('Cleanup: Delete user via API', async () => {
            await apiUtils.deleteAccount(user.email, user.password);
        });
    });

});
