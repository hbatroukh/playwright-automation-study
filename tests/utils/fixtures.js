const base = require('@playwright/test');


exports.customTest = base.test.extend({

    authenticatedPage : async ({ browser }, use) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        const email = page.locator("[id='userEmail']");
        const password = page.locator("[id='userPassword']");
        const submitBtn = page.locator("[id='login']");
        await password.fill("Test1234")

        await email.fill("batroukhhamza@gmail.com");
        await submitBtn.click();
        await page.waitForLoadState("networkidle");
        await use(page);
    }

})