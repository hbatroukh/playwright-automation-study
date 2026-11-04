const {test, expect} = require('@playwright/test');

test.only('Playwright Special Locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

})


test('Playwright Test Level Time Out', async ({page}) => {

    test.setTimeout(60000);

    const slowExpect = expect.configure({timeout: 9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});

    await page.getByRole("link", {name: "Shop"}).click();
    await slowExpect(page.getByRole("heading", { name: "Shop Name" })).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

})