import { test as setup, expect } from '@playwright/test';
import { APIUtils } from '../utils/apiUtils';
import { generateUser } from '../data/dataGenerator';
import { HomePage } from '../pages/homePage';
import { LoginSignupPage } from '../pages/loginSignupPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user via API and UI', async ({ page, request }) => {
    const apiUtils = new APIUtils(request);
    const user = generateUser();
    
    // Create the user entirely via backend API to save time
    await apiUtils.createAccount(user);

    // Login via UI to set the cookies and local storage
    const homePage = new HomePage(page);
    const loginSignupPage = new LoginSignupPage(page);

    await homePage.goto();
    await homePage.clickSignupLogin();
    
    await loginSignupPage.login(user.email, user.password);
    
    // Confirm we are logged in
    await expect(homePage.loggedInAsText).toBeVisible();

    // Save the authentication state
    await page.context().storageState({ path: authFile });
});
