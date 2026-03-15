import { APIRequestContext, expect } from '@playwright/test';
import { UserData } from '../data/dataGenerator';

export class APIUtils {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createAccount(user: UserData) {
        const response = await this.request.post('https://automationexercise.com/api/createAccount', {
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
            }
        });
        const body = await response.text();
        expect(response.status()).toBe(200);
        // The API returns a 200 with JSON message like {"responseCode": 201, "message": "User created!"}
        expect(body).toContain('User created!');
    }

    async deleteAccount(email: string, password: string) {
        const response = await this.request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email,
                password
            }
        });
        const body = await response.text();
        expect(response.status()).toBe(200);
        expect(body).toContain('Account deleted!');
    }
}
