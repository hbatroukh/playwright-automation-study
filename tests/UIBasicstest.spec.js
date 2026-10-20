const {test} = require('@playwright/test');


test('Browser Context Playwright Test', async ({browser})=>
{
    //opens a browser without any cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only('Page Playwright Test', async ({page})=>
    {
        await page.goto("https://google.com");

    });