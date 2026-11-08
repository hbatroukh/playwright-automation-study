const {test, expect} = require('@playwright/test');


test.only("Popup validations", async ({page}) => {

    const hideShowTextBox = page.getByPlaceholder("Hide/Show Example");
    const hideBtn = page.getByRole("button", {name: 'Hide'});

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(hideShowTextBox).toBeVisible();
    await hideBtn.click();
    await expect(hideShowTextBox).toBeHidden();
})