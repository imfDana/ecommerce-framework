import { faker } from '@faker-js/faker';

export function generateUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 12 }),
        title: 'Mr',
        birth_date: '10',
        birth_month: 'May',
        birth_year: '1990',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: 'United States',
        zipcode: faker.location.zipCode('#####'),
        state: faker.location.state(),
        city: faker.location.city(),
        mobile_number: faker.phone.number({ style: 'national' })
    };
}

export type UserData = ReturnType<typeof generateUser>;
