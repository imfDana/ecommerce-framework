import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/homePage';
import { ContactUsPage } from '../pages/contactUsPage';
import * as path from 'path';
import * as fs from 'fs';

test('Test Case 6: Contact Us Form', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    await test.step('1. Launch browser & 2. Navigate to url & 3. Verify home page', async () => {
        await homePage.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');
    });

    await test.step('4. Click on Contact Us button & 5. Verify GET IN TOUCH is visible', async () => {
        await homePage.contactUsBtn.click();
        await expect(contactUsPage.getInTouchText).toBeVisible();
    });

    await test.step('6. Enter name, email, subject and message & 7. Upload file', async () => {
        await contactUsPage.fillContactForm('Test User', 'test@test.com', 'Subject', 'Message body');
        
        // Create a dummy file to upload
        const tempFilePath = path.join(__dirname, 'temp_upload.txt');
        fs.writeFileSync(tempFilePath, 'dummy file content');
        
        await contactUsPage.uploadFileInput.setInputFiles(tempFilePath);
    });

    await test.step('8. Click Submit button & 9. Click OK button', async () => {
        page.once('dialog', dialog => dialog.accept());
        await contactUsPage.submitBtn.click();
    });

    await test.step('10. Verify success message & 11. Click Home button', async () => {
        await expect(contactUsPage.successMsg).toHaveText('Success! Your details have been submitted successfully.');
        await contactUsPage.homeBtn.click();
        await expect(page).toHaveURL('https://automationexercise.com/');
    });
});
