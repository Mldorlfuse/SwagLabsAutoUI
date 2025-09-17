import {expect} from "@playwright/test";

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
        await expect(this.page).toHaveURL(url);
    }

    async addToCartOneItem(index) {
        await expect (this.inventoryItemButtonAddToCart.nth(index)).toHaveText('Add to cart');
        await this.inventoryItemButtonAddToCart.nth(index).click();
    }

    async removeFromCartOneItem(index) {
        await expect (this.inventoryItemButtonAddToCart.nth(index)).toHaveText('Remove');
        await this.inventoryItemButtonAddToCart.nth(index).click();
    }

    async getCountItems() {
        return await this.inventoryItem.count();
    }

    async getRandomCount() {
        return Math.floor(Math.random() * await this.getCountItems()) + 1;
    }

    async addToCartSomeItems(ArrItems){
        for (let i = 0; i < ArrItems.length; i++) {
            await this.addToCartOneItem(ArrItems[i]);
        }
    }

    async removeFromCartSomeItems(ArrItems){
        for (let i = 0; i < ArrItems.length; i++) {
            await this.removeFromCartOneItem(ArrItems[i]);
        }
    }

    async getFieldsOfItem(item){
        return {
            title: await this.inventoryItemName.nth(item).textContent(),
            price: await this.inventoryItemPrice.nth(item).textContent(),
            desc: await this.inventoryItemDesc.nth(item).textContent()
        }
    }

    async sortInventory(select, fieldCheck) {
        await this.page.selectOption(this.sortInventoryPath,select)
        let arrItems = [];
        let sortArrItems = [];
        for (let i = 0; i < await this.getCountItems(); i++){
            arrItems.push(await fieldCheck.nth(i).textContent());
        }
        sortArrItems = arrItems;
        sortArrItems.sort((a,b) => a.localeCompare(b));

        function arraysEqual(a, b) {
            if (a.length !== b.length) return false;
            return a.every((val, i) => val === b[i]);
        }

        expect(arraysEqual(arrItems, sortArrItems)).toBe(true);
    }

    async sortAndCheckByName(){
        await this.sortInventory('az',this.inventoryItemName);
    }

    async sortAndCheckByNameReverse() {
        await this.sortInventory('za',this.inventoryItemName);
    }

    async sortAndCheckByPrice(){
        await this.sortInventory('lohi',this.inventoryItemPrice);
    }

    async sortAndCheckByPriceReverse() {
        await this.sortInventory('hilo',this.inventoryItemPrice);
    }


}