const { faker } = require('@faker-js/faker');

export class CheckoutInfoBuilder {
    constructor() {
        this.data = { // Создаем дефолтные значения
            firstName: '',
            lastName: '',
            postalCode: '',
        };
    }

    withFirstName(firstName) {
        this.data.firstName = firstName;
        return this;
    }

    withLastName(lastName) {
        this.data.lastName = lastName;
        return this;
    }

    withPostalCode(postalCode) {
        this.data.postalCode = postalCode;
        return this;
    }

    withRandomFirstName() {
        this.data.firstName = faker.person.firstName();
        return this;
    }

    withRandomLastName() {
        this.data.lastName = faker.person.lastName();
        return this;
    }

    withRandomPostalCode() {
        this.data.postalCode = faker.location.zipCode();
        return this;
    }

    build() {
        return { ...this.data };
    }
}