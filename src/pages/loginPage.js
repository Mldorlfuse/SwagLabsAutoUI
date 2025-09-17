import {expect} from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = this.page.locator('input[data-test="username"]');
        this.passwordInput = this.page.locator('input[data-test="password"]');
        this.loginButton = this.page.locator('input[data-test="login-button"]');
        this.errorMessage = this.page.locator('h3[data-test="error"]');
    }

    async openPage(url){
        await this.page.goto(url);
    }

    async fillUsername(user){
        await this.usernameInput.fill(user.username);
    }

    async fillPassword(user) {
        await this.passwordInput.fill(user.password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async checkErrorMessage(user){
        await expect(this.errorMessage).toHaveText(user.errorMessage);
    }

    async Login(url, user) {
       await this.openPage(url);
       await this.fillUsername(user);
       await this.fillPassword(user);
       await this.clickLoginButton(user);
    }

    async LoginAndCheckErrorMessage(url, user){
        await this.Login(url, user);
        await this.checkErrorMessage(user);
    }


}