const { request } = require('@playwright/test');
const base = require('@playwright/test');
const loginPayLoad = { userEmail: "batroukhhamza@gmail.com", userPassword: "Test1234" };
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const { APIUtils } = require('./APIUtils.js');

exports.customTest = base.test.extend({

    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await browser.newPage();
        const email = page.locator("[id='userEmail']");
        const password = page.locator("[id='userPassword']");
        const submitBtn = page.locator("[id='login']");

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await password.fill("Test1234")
        await email.fill("batroukhhamza@gmail.com");
        await submitBtn.click();
        await page.waitForLoadState("networkidle");

        await use(page);
        await context.close();
    },

    createOrder: async ({ }, use) => {

        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        await use(response);
        await apiContext.dispose();

    },

    testDataForOrder: {

        productName: 'ADIDAS ORIGINAL'
    }

});