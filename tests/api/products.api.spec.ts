import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com/api';

test.describe('API - Products & Brands', () => {

    test('API 1: Get All Products List', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/productsList`);
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.products).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('API 2: POST To All Products List', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/productsList`);
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('API 3: Get All Brands List', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/brandsList`);
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.brands).toBeTruthy();
        expect(body.brands.length).toBeGreaterThan(0);
    });

    test('API 4: PUT To All Brands List', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/brandsList`);
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('API 5: POST To Search Product', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/searchProduct`, {
            form: { search_product: 'top' },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.products).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/searchProduct`);
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });

});
