import { test, expect } from '@playwright/test';
import { generateUser } from '../../data/dataGenerator';

const BASE_URL = 'https://automationexercise.com/api';

test.describe('API - Login Verification', () => {

    test('API 7: POST To Verify Login with valid details', async ({ request }) => {
        const user = generateUser();

        // First create the account
        await request.post(`${BASE_URL}/createAccount`, {
            form: {
                name: user.name,
                email: user.email,
                password: user.password,
                title: user.title,
                birth_date: user.birth_date,
                birth_month: user.birth_month,
                birth_year: user.birth_year,
                firstname: user.firstname,
                lastname: user.lastname,
                company: user.company,
                address1: user.address1,
                address2: user.address2,
                country: user.country,
                zipcode: user.zipcode,
                state: user.state,
                city: user.city,
                mobile_number: user.mobile_number,
            },
        });

        // Verify login
        const response = await request.post(`${BASE_URL}/verifyLogin`, {
            form: {
                email: user.email,
                password: user.password,
            },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User exists!');

        // Cleanup
        await request.delete(`${BASE_URL}/deleteAccount`, {
            form: { email: user.email, password: user.password },
        });
    });

    test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/verifyLogin`, {
            form: { password: 'somepassword' },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

    test('API 9: DELETE To Verify Login', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/verifyLogin`);
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/verifyLogin`, {
            form: {
                email: 'nonexistent_user_xyz@test.com',
                password: 'invalidpassword',
            },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

});
