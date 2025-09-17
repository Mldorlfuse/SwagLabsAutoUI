import {expect} from "@playwright/test";

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
        await expect(this.page).toHaveURL(url);
    }

    async fillFirstName(value){
        await this.firstNameField.fill(value.firstName);
    }

    async fillLastName(value){
        await this.lastNameField.fill(value.lastName);
    }

    async fillPostalCode(value){
        await this.postalCodeField.fill(value.postalCode);
    }

    async checkErrorMessage(message){
        await expect(this.errorMessage).toHaveText(message);
    }

    async continueButtonClick(){
        await this.continueButton.click();
    }

    async checkoutFillErrorMessageCheck(fillData, errorMessages) {
        await this.continueButtonClick();
        await this.checkErrorMessage(errorMessages.firstNameIsRequired);
        await this.fillFirstName(fillData)
        await this.continueButtonClick();
        await this.checkErrorMessage(errorMessages.lastNameIsRequired);
        await this.fillLastName(fillData);
        await this.continueButtonClick();
        await this.checkErrorMessage(errorMessages.postalCodeIsRequired);
    }

    async fillAllInputs(fillData){
        await this.fillFirstName(fillData);
        await this.fillLastName(fillData);
        await this.fillPostalCode(fillData);
    }
}