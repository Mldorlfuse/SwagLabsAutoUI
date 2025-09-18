import {expect} from "@playwright/test";
import { allure } from "allure-playwright";

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryList = this.page.locator('div[data-test="inventory-list"]');
        this.inventoryItem = this.page.locator('div[data-test="inventory-item"]');
        this.inventoryItemName = this.page.locator('div[data-test="inventory-item-name"]');
        this.inventoryItemDesc = this.page.locator('div[data-test="inventory-item-desc"]');
        this.inventoryItemPrice = this.page.locator('div[data-test="inventory-item-price"]');
        this.inventoryItemButtonAddToCart = this.inventoryItem.locator('button');
        this.sortInventoryPath = 'select[data-test="product-sort-container"]';
    }

    async checkInventoryUrl(url) {
        await allure.step(`Проверить равен ли url-адрес страницы url - ${url}`, async() => {
            await expect(this.page).toHaveURL(url);
        })
    }

    async addToCartOneItem(index) {
        await allure.step(`Проверить что у элемента есть кнопка с текстом "Add to cart" и нажать ее`, async() => {
            await expect (this.inventoryItemButtonAddToCart.nth(index)).toHaveText('Add to cart');
            await this.inventoryItemButtonAddToCart.nth(index).click();
        })
    }

    async removeFromCartOneItem(index) {
        await allure.step(`Проверить что у элемента есть кнопка с текстом "Remove" и нажать ее`, async() => {
            await expect (this.inventoryItemButtonAddToCart.nth(index)).toHaveText('Remove');
            await this.inventoryItemButtonAddToCart.nth(index).click();
        })

    }

    async getCountItems() {
        return await this.inventoryItem.count();
    }

    async getRandomCount() {
        return Math.floor(Math.random() * await this.getCountItems()) + 1;
    }

    async addToCartSomeItems(ArrItems){
        await allure.step(`Добавить случайное количество (${ArrItems.length}) элементов в корзину`, async() => {
            for (let i = 0; i < ArrItems.length; i++) {
                await this.addToCartOneItem(ArrItems[i]);
            }
        })

    }

    async removeFromCartSomeItems(ArrItems){
        await allure.step(`Удалить случайное количество (${ArrItems.length}) элементов из корзины`, async() => {
            for (let i = 0; i < ArrItems.length; i++) {
                await this.removeFromCartOneItem(ArrItems[i]);
            }
        })

    }

    async getFieldsOfItem(item){
        return {
            title: await this.inventoryItemName.nth(item).textContent(),
            price: await this.inventoryItemPrice.nth(item).textContent(),
            desc: await this.inventoryItemDesc.nth(item).textContent()
        }
    }

    async changeTheSelectorInOptions(select){
        await allure.step(`Сменить сортировку на значение "${select}"`, async() => {
            await this.page.selectOption(this.sortInventoryPath,select)
        })
    }

    async checkSortResult(func,arr1,arr2){
        await allure.step('Проверка сортировки', async() => {
            expect(func(arr1, arr2)).toBe(true);
        })
    }

    async sortInventory(select, fieldCheck) {
        await allure.step(`Сортировка и проверка результата`, async() => {
            await this.changeTheSelectorInOptions(select);
            let arrItems = [];
            let sortArrItems = [];
            let countItems = await this.getCountItems();
            for (let i = 0; i < countItems; i++){
                arrItems.push(await fieldCheck.nth(i).textContent());
            }
            sortArrItems = arrItems;
            sortArrItems.sort((a,b) => a.localeCompare(b));

            function arraysEqual(a, b) {
                if (a.length !== b.length) return false;
                return a.every((val, i) => val === b[i]);
            }

            await this.checkSortResult(arraysEqual, arrItems, sortArrItems);
        })

    }

    async sortAndCheckByName(){
        await allure.step(`Провести сортировку по Имени по убыванию`, async() => {
            await this.sortInventory('az',this.inventoryItemName);
        })

    }

    async sortAndCheckByNameReverse() {
        await allure.step(`Провести сортировку по Имени по возрастанию`, async() => {
            await this.sortInventory('za',this.inventoryItemName);
        })

    }

    async sortAndCheckByPrice(){
        await allure.step(`Провести сортировку по цене по возрастанию`, async() => {
            await this.sortInventory('lohi',this.inventoryItemPrice);
        })

    }

    async sortAndCheckByPriceReverse() {
        await allure.step(`Провести сортировку по цене по убыванию`, async() => {
            await this.sortInventory('hilo',this.inventoryItemPrice);
        })

    }


}