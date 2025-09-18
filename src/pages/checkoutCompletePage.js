import {expect} from "@playwright/test";
import {allure} from "allure-playwright";

export class CheckoutCompletePage{
    constructor(page) {
        this.page = page;
        this.completeHeader = this.page.locator('h2[data-test="complete-header"]');
        this.completeText = this.page.locator('div[data-test="complete-text"]');
        this.backHomeButton = this.page.locator('button[data-test="back-to-products"]');
    }

    async checkUrl(url){
        await allure.step(`Проверить равен ли url-адрес страницы url - ${url}`, async() => {
            await expect(this.page).toHaveURL(url);
        })
    }

    async backToProductButtonClick(){
        await allure.step(`Нажать кнопку "Back Home"`, async() => {
            await this.backHomeButton.click();
        })

    }

    async checkCompleteHeaderText(text){
        await allure.step(`Проверить равен ли заголовок значению ${text}`, async() => {
            await expect(this.completeHeader).toHaveText(text);
        })

    }

    async checkCompleteText(text){
        await allure.step(`Проверить равен ли полный текст значению ${text}`, async() => {
            await expect(this.completeText).toHaveText(text);
        })

    }

    async checkAllCompleteTexts(text) {
        await allure.step(`Проверка информационного сообщения с благодарностью за покупку`, async() => {
            await this.checkCompleteHeaderText(text.header);
            await this.checkCompleteText(text.text);
        })

    }
}