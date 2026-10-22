const {test, expect} = require('@playwright/test');


test.only('Browser Context Playwright Test', async ({browser})=>
{
    //opens a browser without any cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // css 
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("[id='signInBtn']").click();
});

test('Page Playwright Test', async ({page})=>
    {
        await page.goto("https://google.com");
        //get title and assert
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });