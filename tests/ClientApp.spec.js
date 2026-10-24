const {test, expect} = require('@playwright/test');

test('Automation Practice first item', async ({page})=> 
    {
        const email = page.locator("[id='userEmail']");
        const password = page.locator("[id='userPassword']");
        const submitBtn = page.locator("[id='login']");
        const firstCardName = page.locator(".card-body h5").first();

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await email.fill("batroukhhamza@gmail.com");
        await password.fill("Test1234");
        await submitBtn.click();
        // await page.waitForLoadState("networkidle");
        // or alternatively this could be used instead of networkidle
        await firstCardName.waitFor();
        console.log(await firstCardName.textContent());
    });