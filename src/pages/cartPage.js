import {expect} from "@playwright/test";
import {allure} from "allure-playwright";

export class CartPage{
    constructor(page){
        this.page = page;
        this.cartList = this.page.locator('div[data-test="cart-list"]');
        this.cartItem = this.page.locator('div[data-test="inventory-item"]');
        this.cartItemName =  this.page.locator('div[data-test="inventory-item-name"]');
        this.cartItemPrice = this.page.locator('div[data-test="inventory-item-price"]');
        this.cartItemDescription = this.page.locator('div[data-test="inventory-item-desc"]');
        this.cartRemoveButton = this.cartItem.locator('button');
        this.backButton = this.page.locator('button[data-test="continue-shopping"]');
        this.checkoutButton = this.page.locator('button[data-test="checkout"]');
    }

    async checkUrl(url){
        await allure.step(`Проверить равен ли url-адрес страницы url - ${url}`, async() => {
            await expect(this.page).toHaveURL(url);
        })
    }

    async checkCountItems(countItem){
        await allure.step(`Проверить равняется ли количество элементов - ${countItem}`, async() => {
            await expect(this.cartItem).toHaveCount(countItem);
        })

    }

    async removeFirstItem(){
        await allure.step(`Удалить первый элемент`, async() => {
            await this.cartRemoveButton.first().click();
        })

    }

    async checkItemName(value){
        await allure.step(`Проверить соответствие заголовка элемента значению ${value}`, async() => {
            await expect(this.cartItemName).toHaveText(value);
        })

    }

    async checkItemDesc(value){
        await allure.step(`Проверить соответствие описания элемента значению ${value}`, async() => {
            await expect(this.cartItemDescription).toHaveText(value);
        })

    }

    async checkItemPrice(value){
        await allure.step(`Проверить соответствие цены элемента значению ${value}`, async() => {
            await expect(this.cartItemPrice).toHaveText(value);
        })

    }

    async checkFieldsOfItem(fieldsObject){
        await allure.step(`Проверка данных элемента`, async() => {
            await this.checkItemName(fieldsObject.title);
            await this.checkItemDesc(fieldsObject.desc);
            await this.checkItemPrice(fieldsObject.price);
        })

    }

    async backButtonClick(){
        await allure.step(`Нажать кнопку "Continue Shopping"`, async() => {
            await this.backButton.click();
        })

    }

    async checkoutButtonClick(){
        await allure.step(`Нажать кнопку "Checkout"`, async() => {
            await this.checkoutButton.click();
        })

    }
}