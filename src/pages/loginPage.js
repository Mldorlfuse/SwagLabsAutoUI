import {expect} from "@playwright/test";
import { allure } from "allure-playwright";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = this.page.locator('input[data-test="username"]');
        this.passwordInput = this.page.locator('input[data-test="password"]');
        this.loginButton = this.page.locator('input[data-test="login-button"]');
        this.errorMessage = this.page.locator('h3[data-test="error"]');
    }

    async openPage(url){
        await allure.step(`Перейти по url - ${url}`, async() => {
            await this.page.goto(url);
        })
    }

    async fillUsername(user){
        await allure.step(`Ввести логин - ${user.username} `, async() => {
            await this.usernameInput.fill(user.username);
        })
    }

    async fillPassword(user) {
        await allure.step(`Ввести пароль - ${user.password} `, async() => {
            await this.passwordInput.fill(user.password);
        })

    }

    async clickLoginButton() {
        await allure.step(`Нажать кнопку "Login"`, async() => {
            await this.loginButton.click();
        })

    }

    async checkErrorMessage(user){
        await allure.step(`Проверить отображается ли сообщение об ошибке - ${user.errorMessage} `, async() => {
            await expect(this.errorMessage).toHaveText(user.errorMessage);
        })

    }

    async Login(url, user) {
        await allure.step(`Авторизация`, async() => {
            await this.openPage(url);
            await this.fillUsername(user);
            await this.fillPassword(user);
            await this.clickLoginButton(user);
        })

    }

    async LoginAndCheckErrorMessage(url, user){
        await allure.step(`Авторизация и проверка ошибки`, async() => {
            await this.Login(url, user);
            await this.checkErrorMessage(user);
        })

    }


}