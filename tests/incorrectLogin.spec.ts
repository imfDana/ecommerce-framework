import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginSignupPage = new LoginSignupPage(page);

    await test.step('1. Launch browser & 2. Navigate to url', async () => {
        await homePage.goto();
    });

    await test.step('3. Verify that home page is visible successfully', async () => {
        await expect(page).toHaveURL('https://automationexercise.com/');
    });

    await test.step('4. Click on Signup / Login button & 5. Verify Login to your account is visible', async () => {
        await homePage.clickSignupLogin();
        await expect(loginSignupPage.loginToYourAccountText).toBeVisible();
    });

    await test.step('6. Enter incorrect email address and password & 7. Click login button', async () => {
        await loginSignupPage.login('incorrect_email_999@example.com', 'wrongpassword');
    });

    await test.step('8. Verify error Your email or password is incorrect! is visible', async () => {
        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });
});
