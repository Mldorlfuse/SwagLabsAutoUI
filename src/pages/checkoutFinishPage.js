import {expect} from "@playwright/test";
import {allure} from "allure-playwright";

export class CheckoutFinishPage {
    constructor(page) {
        this.page = page;
        this.inventoryItem = this.page.locator('div[data-test="inventory-item"]');
        this.inventoryItemName = this.page.locator('div[data-test="inventory-item-name"]');
        this.inventoryItemDesc = this.page.locator('div[data-test="inventory-item-desc"]');
        this.inventoryItemPrice = this.page.locator('div[data-test="inventory-item-price"]');
        this.subtotalPrice = this.page.locator('div[data-test="subtotal-label"]');
        this.cancelButton = this.page.locator('button[data-test="cancel"]');
        this.finishButton = this.page.locator('button[data-test="finish"]');
    }

    async checkUrl(url){
        await allure.step(`Проверить равен ли url-адрес страницы url - ${url}`, async() => {
            await expect(this.page).toHaveURL(url);
        })
    }

    async finishButtonClick(){
        await allure.step(`Нажать кнопку "Finish"`, async() => {
            await this.finishButton.click();
        })

    }

    async cancelButtonClick(){
        await allure.step(`Нажать кнопку "Cancel"`, async() => {
            await this.cancelButton.click();
        })

    }

    async checkInventoryItemName(value) {
        await allure.step(`Проверить соответствие заголовка элемента значению ${value}`, async() => {
            await expect(this.inventoryItemName).toHaveText(value);
        })

    }

    async checkInventoryItemDesc(value) {
        await allure.step(`Проверить соответствие описания элемента значению ${value}`, async() => {
            await expect(this.inventoryItemDesc).toHaveText(value);
        })

    }

    async checkInventoryItemPrice(value) {
        await allure.step(`Проверить соответствие цены элемента значению ${value}`, async() => {
            await expect(this.inventoryItemPrice).toHaveText(value);
        })

    }

    async checkSubtotalPrice(value) {
        await allure.step(`Проверить соответствие промежуточной цены значению ${value}`, async() => {
            await expect(this.subtotalPrice).toHaveText('Item total: ' + value);
        })

    }

    async checkAllFieldsItem(fields) {
        await allure.step(`Проверка всех полей`, async() => {
            await this.checkInventoryItemName(fields.title);
            await this.checkInventoryItemDesc(fields.desc);
            await this.checkInventoryItemPrice(fields.price);
        })

    }
}