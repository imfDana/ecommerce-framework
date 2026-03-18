import { test, expect } from '@playwright/test';
import { generateUser } from '../../data/dataGenerator';

const BASE_URL = 'https://automationexercise.com/api';

test.describe('API - Account Management', () => {

    test('API 11: POST To Create/Register User Account', async ({ request }) => {
        const user = generateUser();

        const response = await request.post(`${BASE_URL}/createAccount`, {
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
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(201);
        expect(body.message).toBe('User created!');

        // Cleanup
        await request.delete(`${BASE_URL}/deleteAccount`, {
            form: { email: user.email, password: user.password },
        });
    });

    test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
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

        // Delete the account
        const response = await request.delete(`${BASE_URL}/deleteAccount`, {
            form: { email: user.email, password: user.password },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('Account deleted!');
    });

    test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
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

        // Update the account
        const response = await request.put(`${BASE_URL}/updateAccount`, {
            form: {
                name: user.name,
                email: user.email,
                password: user.password,
                title: 'Mrs',
                birth_date: '15',
                birth_month: 'June',
                birth_year: '1985',
                firstname: 'UpdatedFirstName',
                lastname: 'UpdatedLastName',
                company: 'Updated Company',
                address1: '456 Updated Street',
                address2: 'Suite 200',
                country: user.country,
                zipcode: '99999',
                state: 'California',
                city: 'Los Angeles',
                mobile_number: '5551234567',
            },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User updated!');

        // Cleanup
        await request.delete(`${BASE_URL}/deleteAccount`, {
            form: { email: user.email, password: user.password },
        });
    });

    test('API 14: GET user account detail by email', async ({ request }) => {
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

        // Get user detail by email
        const response = await request.get(`${BASE_URL}/getUserDetailByEmail`, {
            params: { email: user.email },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(body.user).toBeTruthy();
        expect(body.user.name).toBe(user.name);
        expect(body.user.email).toBe(user.email);

        // Cleanup
        await request.delete(`${BASE_URL}/deleteAccount`, {
            form: { email: user.email, password: user.password },
        });
    });

});
