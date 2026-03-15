import { test as setup } from '@playwright/test';

// Inject network interception to block all ads on every test
setup.beforeEach(async ({ page }) => {
    await page.route('**/*googlesyndication.com/**', route => route.abort());
    await page.route('**/*doubleclick.net/**', route => route.abort());
    await page.route('**/*googleads.g.doubleclick.net/**', route => route.abort());
    await page.route('**/*adservice.google.com/**', route => route.abort());
});
