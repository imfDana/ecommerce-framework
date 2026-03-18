import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { generateUser } from '../../data/dataGenerator';

test.describe('Authentication Tests', () => {

    test('Test Case 1: Register User', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const user = generateUser();

        await test.step('1-3 setup', async () => {
            await homePage.navigateToHomePageSuccessfuly();
        });

        await test.step('Click on signup/login button and verify its visibility', async () => {
            await homePage.clickSignupLogin();
            await expect(signupPage.newUserSignupText).toBeVisible();
        });

        await test.step('5-6. Enter name and email address and click Signup', async () => {
            await signupPage.signupInitial(user.name, user.email);
        });

        await test.step('7-12. Verify Enter Account Information and fill details', async () => {
            await expect(signupPage.enterAccountInfoText).toBeVisible();
            await signupPage.fillSignupForm(user);
        });

        await test.step('13. Click Create Account button', async () => {
            await signupPage.clickCreateAccount();
        });

        await test.step('14. Verify that ACCOUNT CREATED! is visible', async () => {
            await expect(signupPage.accountCreatedText).toBeVisible();
        });

        await test.step('15. Click Continue button', async () => {
            await signupPage.continueBtn.click();
            await homePage.waitForPageLoad();
        });

        await test.step('16. Verify that Logged in as username is visible', async () => {
            await expect(homePage.loggedInAsText).toBeVisible();
            await expect(homePage.loggedInAsText).toContainText(user.name);
        });

        await test.step('17. Click Delete Account button', async () => {
            await homePage.clickDeleteAccount();
        });

        await test.step('18. Verify that ACCOUNT DELETED! is visible and click Continue', async () => {
            await expect(signupPage.accountDeletedText).toBeVisible();
            await signupPage.continueBtn.click();
        });
    });

});
