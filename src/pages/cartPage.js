import {expect} from "@playwright/test";

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
        await expect(this.page).toHaveURL(url);
    }

    async checkCountItems(countItem){
        await expect(this.cartItem).toHaveCount(countItem);
    }

    async removeFirstItem(){
        await this.cartRemoveButton.first().click();
    }

    async checkFieldsOfItem(fieldsObject){
        await expect(this.cartItemName).toHaveText(fieldsObject.title);
        await expect(this.cartItemDescription).toHaveText(fieldsObject.desc);
        await expect(this.cartItemPrice).toHaveText(fieldsObject.price);
    }

    async backButtonClick(){
        await this.backButton.click();
    }

    async checkoutButtonClick(){
        await this.checkoutButton.click();
    }
}