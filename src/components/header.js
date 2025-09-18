import {expect} from "@playwright/test";
import {urls} from "../data";
import { allure } from "allure-playwright";

export class Header {
    constructor(page) {
        this.page = page;
        this.title = this.page.locator('.app_logo');
        this.shoppingCart = this.page.locator('a[data-test="shopping-cart-link"]');
        this.menu = this.page.locator('.bm-burger-button');
        this.logoutButton = this.page.locator('a[data-test="logout-sidebar-link"]');
        this.countCart = this.page.locator('span[data-test="shopping-cart-badge"]');
    }

    async openShoppingCart() {
        await allure.step(`Перейти в корзину`, async() => {
            await this.shoppingCart.click();
        })
    }

    async openMenu() {
        await allure.step(`Перейти в меню навигации`, async() => {
            await this.menu.click();
        })

    }

    async logout() {
        await allure.step(`Нажать кнопку "Logout"`, async() => {
            await this.logoutButton.click();
        })

    }

    async checkLogout(url) {
        await allure.step(`Проверить равен ли url адрес страницы url - ${url}`, async() => {
            await expect(this.page).toHaveURL(url);
        })

    }

    async fullPathLogout() {
        await allure.step(`Выход из аккаунта`, async() => {
            await this.openMenu();
            await this.logout();
            await this.checkLogout(urls.registerPageUrl)
        })

    }

    async checkCountCart(count) {
        await allure.step(`Проверить отображается ли количество товаров - ${count} в иконке корзины`, async() => {
            await expect(this.countCart).toHaveText(count.toString());
        })

    }

    async checkEmptyCart() {
        await allure.step(`Проверить что в иконке корзины не отображает количество товаров`, async() => {
            await expect(this.countCart).toHaveCount(0);
        })

    }
}