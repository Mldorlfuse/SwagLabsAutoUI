import {expect} from "@playwright/test";

export class CheckoutCompletePage{
    constructor(page) {
        this.page = page;
        this.completeHeader = this.page.locator('h2[data-test="complete-header"]');
        this.completeText = this.page.locator('div[data-test="complete-text"]');
        this.backHomeButton = this.page.locator('button[data-test="back-to-products"]');
    }

    async checkUrl(url){
        await expect(this.page).toHaveURL(url);
    }

    async backToProductButtonClick(){
        await this.backHomeButton.click();
    }

    async checkCompleteHeaderText(text){
        await expect(this.completeHeader).toHaveText(text);
    }

    async checkCompleteText(text){
        await expect(this.completeText).toHaveText(text);
    }

    async checkAllCompleteTexts(text) {
        await this.checkCompleteHeaderText(text.header);
        await this.checkCompleteText(text.text);
    }
}