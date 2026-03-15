import { test as base } from '@playwright/test';

const AD_DOMAINS = [
    '**/*googlesyndication.com/**',
    '**/*doubleclick.net/**',
    '**/*adservice.google.com/**',
    '**/*google-analytics.com/**',
];

export const test = base.extend({
    page: async ({ page }, use) => {
        for (const domain of AD_DOMAINS) {
            await page.route(domain, route => route.abort());
        }
        await use(page);
    },
});

export { expect } from '@playwright/test';
