import {LoginPage, InventoryPage, CartPage, CheckoutInfoPage, CheckoutFinishPage, CheckoutCompletePage} from "./pages";
import {CheckoutInfoBuilder} from './data'

import {Header} from "./components";

export class App {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page)
        this.header = new Header(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutInfoPage = new CheckoutInfoPage(this.page);
        this.checkoutInfoBuilder = new CheckoutInfoBuilder();
        this.checkoutFinishPage = new CheckoutFinishPage(this.page);
        this.checkoutCompletePage = new CheckoutCompletePage(this.page);
    }
}