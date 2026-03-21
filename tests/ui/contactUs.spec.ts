import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/homePage';
import { ContactUsPage } from '../../pages/contactUsPage';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

test('Test Case 6: Contact Us Form', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    const tempFilePath = path.join(os.tmpdir(), 'e2e_upload_test.txt');
    fs.writeFileSync(tempFilePath, 'dummy file content');

    await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
        await homePage.navigateToHomePageSuccessfuly();
    });

    await test.step('4. Click on Contact Us button', async () => {
        await homePage.contactUsBtn.click();
    });

    await test.step('5. Verify GET IN TOUCH is visible', async () => {
        await expect(contactUsPage.getInTouchText).toBeVisible();
    });

    await test.step('6. Enter name, email, subject and message', async () => {
        await contactUsPage.fillContactForm('Test User', 'test@test.com', 'Subject', 'Message body');
    });

    await test.step('7. Upload file', async () => {
        await contactUsPage.uploadFileInput.setInputFiles(tempFilePath);
    });

    await test.step('8. Click Submit button & 9. Click OK button', async () => {
        await contactUsPage.submitForm();
    });

    await test.step('10. Verify success message', async () => {
        await expect(contactUsPage.successMsg).toBeVisible({ timeout: 10000 });
        await expect(contactUsPage.successMsg).toContainText('Success! Your details have been submitted successfully.');
    });

    await test.step('11. Click Home button and verify that landed to home page', async () => {
        await contactUsPage.clickHome();
        await expect(page).toHaveURL('/');
        await expect(homePage.homePageItems).toBeVisible();
    });
});
