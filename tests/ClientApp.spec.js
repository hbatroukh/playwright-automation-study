const {test, expect} = require('@playwright/test');

test.only('Automation Practice first item', async ({page})=> 
    {
        const email = page.locator("[id='userEmail']");
        const password = page.locator("[id='userPassword']");
        const submitBtn = page.locator("[id='login']");
        const firstCardName = page.locator(".card-body h5").first();
        const products = page.locator(".card-body");
        const productName = 'ZARA COAT 3'
        const cartButton = page.locator("[routerLink*='cart']");
        const zaraCoatName = page.locator(`h3:has-text("${productName}")`);

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await email.fill("batroukhhamza@gmail.com");
        await password.fill("Test1234");
        await submitBtn.click();
        await page.waitForLoadState("networkidle");
        // or alternatively this could be used instead of networkidle
        await firstCardName.waitFor();
        console.log(await firstCardName.textContent());

        //Zara Coat 3
        const count = await products.count();
        for(let i = 0; i < count; i++) {
            if (await products.nth(i).locator("b").textContent() === productName){
                //add to cart
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        await cartButton.click();
        await expect(zaraCoatName).toBeVisible();
    });