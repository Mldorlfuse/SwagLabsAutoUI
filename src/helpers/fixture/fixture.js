import { test as base } from '@playwright/test';
import {logins, urls} from "../../data";
import { App } from "../../facade";

export const test = base.extend({
    loginFixture: async ({page}, use) => {
        const app = new App(page)
        await app.loginPage.Login(urls.registerPageUrl,logins.standartLoginData);
        await use(app);
    },
    webApp: async ({page}, use) => {
        const app = new App(page);
        await use(app);
    }
})

export { expect } from '@playwright/test';
