const { request } = require('@playwright/test');
const base = require('@playwright/test');
const loginPayLoad = { userEmail: "batroukhhamza@gmail.com", userPassword: "Test1234" };
const {APIUtils} = require('./APIUtils.js');

exports.customTest = base.test.extend({

    authenticatedPage: async ({ page }, use) => {
        const email = page.locator("[id='userEmail']");
        const password = page.locator("[id='userPassword']");
        const submitBtn = page.locator("[id='login']");

        await password.fill("Test1234")
        await email.fill("batroukhhamza@gmail.com");
        await submitBtn.click();
        await page.waitForLoadState("networkidle");

        await use(page);
    },

    createOrder : async({}, use) =>{

        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayLoad);
        response = await apiUtils.createOrder(orderPayLoad);
        use(response);

    }

})