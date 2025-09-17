import {expect} from "@playwright/test";

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
        await expect(this.page).toHaveURL(url);
    }

    async finishButtonClick(){
        await this.finishButton.click();
    }

    async cancelButtonClick(){
        await this.cancelButton.click();
    }

    async checkInventoryItemName(value) {
        await expect(this.inventoryItemName).toHaveText(value);
    }

    async checkInventoryItemDesc(value) {
        await expect(this.inventoryItemDesc).toHaveText(value);
    }

    async checkInventoryItemPrice(value) {
        await expect(this.inventoryItemPrice).toHaveText(value);
    }

    async checkSubtotalPrice(value) {
        await expect(this.subtotalPrice).toHaveText('Item total: ' + value);
    }

    async checkAllFieldsItem(fields) {
        await this.checkInventoryItemName(fields.title);
        await this.checkInventoryItemDesc(fields.desc);
        await this.checkInventoryItemPrice(fields.price);
    }
}