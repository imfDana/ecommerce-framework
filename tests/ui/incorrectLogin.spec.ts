import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';

test.use({ storageState: undefined });

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const invalidUser = {
        email: `fake_${Date.now()}@test.com`,
        password: 'WrongPassword123!',
    };

    await test.step('1. Launch browser & 2. Navigate to url', async () => {
        await homePage.goto();
    });

    await test.step('3. Verify that home page is visible successfully', async () => {
        await expect(page).toHaveURL('/');
    });

    await test.step('4. Click on Signup / Login button', async () => {
        await loginPage.loginTopBarBtn.click();
    });

    await test.step('5. Verify Login to your account is visible', async () => {
        await expect(loginPage.loginToYourAccountText).toBeVisible();
    });

    await test.step('6 & 7. Enter incorrect credentials and click login', async () => {
        await loginPage.loginUser(invalidUser.email, invalidUser.password);
    });

    await test.step('8. Verify error message is visible', async () => {
        await expect(loginPage.wrongCredentialsError).toBeVisible();
    });
});