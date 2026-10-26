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

test('Page Playwright Test', async ({page})=>
    {
        await page.goto("https://google.com");
        //get title and assert
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });

 test('UI Controls', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        const userName = page.locator('#username');
        const signInBtn = page.locator("[id='signInBtn']");
        const dropdown = page.locator("select.form-control");
        const user = page.locator(".radiotextsty").last();
        const okayBtn = page.locator("[id='okayBtn']");
        const terms = page.locator("[id='terms']");
        const firstBlinkingText = page.locator(".blinkingText").first();

        dropdown.selectOption("consult");
        await user.click();
        await okayBtn.click();
        console.log(await user.isChecked());
        await expect(user).toBeChecked();
        await terms.click();
        await expect(terms).toBeChecked();
        await terms.uncheck();
        expect(await terms.isChecked()).toBeFalsy();
        await expect(firstBlinkingText).toBeVisible();
    });

    test.only('Child windows handling', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']");
        const userName = page.locator('#username');

        const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ])
        
        const text = await newPage.locator(".red").textContent();
        const arrayText = text.split("@");
        const emailDomain = arrayText[1].split(" ")[0]
        console.log(emailDomain);
        await userName.fill(emailDomain);
        console.l
    })