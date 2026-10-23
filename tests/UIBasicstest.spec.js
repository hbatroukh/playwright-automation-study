const {test, expect} = require('@playwright/test');


test('Browser Context Playwright Test', async ({browser})=>
{   
    //opens a browser without any cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const signInBtn = page.locator("[id='signInBtn']");
    const cardTitle = page.locator(".card-body a");


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // css 
    await userName.fill("rahulshetty")
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signInBtn.click();
    // wait till locator shows up on page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    // either one below works to get the first
    console.log(await cardTitle.nth(1).textContent());
    console.log(await cardTitle.first().textContent());
    // print all card titles
    const allCardTitles = await cardTitle.allTextContents();
    console.log(allCardTitles);

});

test.only('Automation Practice first item', async ({page})=> 
    {
        const email = page.locator("[id='userEmail']");
        const password = page.locator("[id='userPassword']");
        const submitBtn = page.locator("[id='login']");
        const firstCardName = page.locator(".card-body h5").first();

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await email.fill("batroukhhamza@gmail.com");
        await password.fill("Test1234");
        await submitBtn.click();
        await page.waitForURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
        await page.waitForLoadState("networkidle");
        console.log(await firstCardName.textContent());
    });

test('Page Playwright Test', async ({page})=>
    {
        await page.goto("https://google.com");
        //get title and assert
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });