import { test as setup, expect } from '../fixtures/base';
import { APIUtils } from '../utils/apiUtils';
import { generateUser } from '../data/dataGenerator';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user via API and UI', async ({ page, request }) => {
    const apiUtils = new APIUtils(request);
    const user = generateUser();

    await apiUtils.createAccount(user);

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickSignupLogin();

    await loginPage.loginUser(user.email, user.password);

    await expect(homePage.loggedInAsText).toBeVisible();
    await page.context().storageState({ path: authFile });
});
