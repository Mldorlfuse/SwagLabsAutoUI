import {expect} from "@playwright/test";
import {allure} from "allure-playwright";

export class CheckoutInfoPage {
    constructor(page) {
        this.page = page;
        this.firstNameField = this.page.locator('input[data-test="firstName"]');
        this.lastNameField = this.page.locator('input[data-test="lastName"]');
        this.postalCodeField = this.page.locator('input[data-test="postalCode"]');
        this.errorMessage = this.page.locator('h3[data-test="error"]');
        this.backButton = this.page.locator('button[data-test="cancel"]');
        this.continueButton = this.page.locator('input[data-test="continue"]');
    }

    async checkUrl(url){
        await allure.step(`Проверить равен ли url-адрес страницы url - ${url}`, async() => {
            await expect(this.page).toHaveURL(url);
        })
    }

    async fillFirstName(value){
        await allure.step(`Ввести firstname - ${value.firstName}`, async() => {
            await this.firstNameField.fill(value.firstName);
        })

    }

    async fillLastName(value){
        await allure.step(`Ввести lastname - ${value.lastName}`, async() => {
            await this.lastNameField.fill(value.lastName);
        })

    }

    async fillPostalCode(value){
        await allure.step(`Ввести postalcode - ${value.postalCode}`, async() => {
            await this.postalCodeField.fill(value.postalCode);
        })

    }

    async checkErrorMessage(message){
        await allure.step(`Проверить отображается ли сообщение об ошибке - ${message}`, async() => {
            await expect(this.errorMessage).toHaveText(message);
        })

    }

    async continueButtonClick(){
        await allure.step(`Нажать кнопку "Continue"`, async() => {
            await this.continueButton.click();
        })

    }

    async checkoutFillErrorMessageCheck(fillData, errorMessages) {
        await allure.step(`Проверить отображается ли ошибка при незаполнении каждого из полей`, async() => {
            await this.continueButtonClick();
            await this.checkErrorMessage(errorMessages.firstNameIsRequired);
            await this.fillFirstName(fillData)
            await this.continueButtonClick();
            await this.checkErrorMessage(errorMessages.lastNameIsRequired);
            await this.fillLastName(fillData);
            await this.continueButtonClick();
            await this.checkErrorMessage(errorMessages.postalCodeIsRequired);
        })

    }

    async fillAllInputs(fillData){
        await allure.step(`Заполнить все поля`, async() => {
            await this.fillFirstName(fillData);
            await this.fillLastName(fillData);
            await this.fillPostalCode(fillData);
        })

    }
}