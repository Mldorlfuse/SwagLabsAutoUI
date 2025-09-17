import { test } from '../src/helpers/fixture/fixture'
import {logins, urls, errorCheckoutInfoMessages, checkoutCompleteDataFields} from "../src/data";

test.describe("UI тесты @UI", () => {
    test("Успешная авторизация", async ({webApp}) => {
        await webApp.loginPage.Login(urls.registerPageUrl,logins.standartLoginData);
        await webApp.inventoryPage.checkInventoryUrl(urls.inventoryPageUrl);
    })

    test("Попытка авторизации с заблокированными данными", async ({webApp}) => {
        await webApp.loginPage.LoginAndCheckErrorMessage(urls.registerPageUrl,logins.lockedLoginData);
    })

    test("Попытка авторизации с неверными данными", async ({webApp}) => {
        await webApp.loginPage.LoginAndCheckErrorMessage(urls.registerPageUrl,logins.wrongLoginData);
    })

    test("Авторизация и выход из аккаунта", async ({loginFixture, webApp}) => {
        await loginFixture;

        await webApp.header.fullPathLogout();
    })

    let countItems;
    let ArrNumbers;
    let resultRandomItems;

    test.beforeEach(async ({webApp}) => {
        await webApp.loginPage.Login(urls.registerPageUrl,logins.standartLoginData);

        countItems = Math.floor(Math.random() * await webApp.inventoryPage.getRandomCount()) + 1;
        ArrNumbers = [];
        resultRandomItems = [];

        for (let i = 0; i < await webApp.inventoryPage.getCountItems(); i++) {
            ArrNumbers.push(i);
        }

        for (let i = ArrNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ArrNumbers[i], ArrNumbers[j]] = [ArrNumbers[j], ArrNumbers[i]];
        }

        for (let i = 0; i < countItems; i++) {
            resultRandomItems.push(ArrNumbers[i]);
        }
    })

    test("Добавление и удаление элементов из корзины с главной страницы", async ({loginFixture, webApp}) => {
        await loginFixture;

        await webApp.inventoryPage.addToCartSomeItems(resultRandomItems);
        await webApp.header.checkCountCart(countItems);
        await webApp.inventoryPage.removeFromCartSomeItems(resultRandomItems)
        await webApp.header.checkEmptyCart();
    })

    test('Добавление элементов в корзину и удаление одного из них на странице корзины', async ({loginFixture, webApp}) => {
        await loginFixture;

        await webApp.inventoryPage.addToCartSomeItems(resultRandomItems);
        await webApp.header.openShoppingCart();
        await webApp.cartPage.checkUrl(urls.cartPageUrl);

        await webApp.cartPage.checkCountItems(countItems);
        await webApp.cartPage.removeFirstItem();
        await webApp.cartPage.checkCountItems(countItems - 1);
    })

    let checkoutData;

    test.beforeEach(async ({webApp}) => {
        checkoutData = webApp.checkoutInfoBuilder.withRandomFirstName().withRandomLastName().withRandomPostalCode().build();
    })

    test("Попытка оставить одно из полей пустым при заполнении формы на странице информации",  async ({loginFixture, webApp}) => {
        await loginFixture;

        await webApp.inventoryPage.addToCartSomeItems(resultRandomItems);
        await webApp.header.openShoppingCart();
        await webApp.cartPage.checkoutButtonClick();

        await webApp.checkoutInfoPage.checkoutFillErrorMessageCheck(checkoutData, errorCheckoutInfoMessages)
    })

    let fieldsOfItem

    test("Проверка соответствия полей товара на всех страницах и url этих страниц", async ({loginFixture ,webApp}) => {
        await loginFixture;

        await webApp.inventoryPage.checkInventoryUrl(urls.inventoryPageUrl);

        await webApp.inventoryPage.addToCartOneItem(countItems - 1);
        fieldsOfItem = await webApp.inventoryPage.getFieldsOfItem(countItems - 1);
        await webApp.header.openShoppingCart();

        await webApp.cartPage.checkUrl(urls.cartPageUrl);
        await webApp.cartPage.checkFieldsOfItem(fieldsOfItem);
        await webApp.cartPage.checkoutButtonClick();

        await webApp.checkoutInfoPage.checkUrl(urls.checkoutInfoPageUrl);
        await webApp.checkoutInfoPage.fillAllInputs(checkoutData);
        await webApp.checkoutInfoPage.continueButtonClick();

        await webApp.checkoutFinishPage.checkUrl(urls.checkoutFinishPageUrl);
        await webApp.checkoutFinishPage.checkAllFieldsItem(fieldsOfItem);
        await webApp.checkoutFinishPage.checkSubtotalPrice(fieldsOfItem.price);
        await webApp.checkoutFinishPage.finishButtonClick();

        await webApp.checkoutCompletePage.checkUrl(urls.checkoutCompletedPageUrl);
        await webApp.checkoutCompletePage.checkAllCompleteTexts(checkoutCompleteDataFields);
        await webApp.checkoutCompletePage.backToProductButtonClick();

        await webApp.inventoryPage.checkInventoryUrl(urls.inventoryPageUrl);
    })

    test("Оформление товара", async ({loginFixture, webApp}) => {
        await loginFixture;

        await webApp.inventoryPage.addToCartSomeItems(resultRandomItems);
        await webApp.header.openShoppingCart();
        await webApp.cartPage.checkoutButtonClick();
        await webApp.checkoutInfoPage.fillAllInputs(checkoutData);
        await webApp.checkoutInfoPage.continueButtonClick();
        await webApp.checkoutFinishPage.finishButtonClick();
        await webApp.checkoutCompletePage.backToProductButtonClick();
    })

    test('Фильтрация', async ({loginFixture, webApp}) => {
        await loginFixture;

        await webApp.inventoryPage.sortAndCheckByNameReverse();
        await webApp.inventoryPage.sortAndCheckByName();
        await webApp.inventoryPage.sortAndCheckByPrice();
        await webApp.inventoryPage.sortAndCheckByPriceReverse();
    })
})


