import {expect} from "@playwright/test";
import {urls} from "../data";

export class Header {
    constructor(page) {
        this.page = page;
        this.title = this.page.locator('.app_logo');
        this.shoppingCart = this.page.locator('a[data-test="shopping-cart-link"]');
        this.menu = this.page.locator('.bm-burger-button');
        this.logoutButton = this.page.locator('a[data-test="logout-sidebar-link"]');
        this.countCart = this.page.locator('span[data-test="shopping-cart-badge"]');
    }

    async checkTitle() {
       await expect(this.title).toHaveText('Swag Labs');
    }

    async openShoppingCart() {
        await this.shoppingCart.click();
    }

    async openMenu() {
        await this.menu.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

    async checkLogout(url) {
        await expect(this.page).toHaveURL(url);
    }

    async fullPathLogout() {
       await this.openMenu();
       await this.logout();
       await this.checkLogout(urls.registerPageUrl)
    }

    async checkCountCart(count) {
        await expect(this.countCart).toHaveText(count.toString());
    }

    async checkEmptyCart() {
        await expect(this.countCart).toHaveCount(0);
    }
}