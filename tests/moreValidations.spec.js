const {test, expect} = require('@playwright/test');


test.only("Popup validations", async ({page}) => {

    const hideShowTextBox = page.getByPlaceholder("Hide/Show Example");
    const hideBtn = page.getByRole("button", {name: 'Hide'});
    const confirmBtn = page.getByRole("button", {name: 'Confirm'});
    const mouseHoverBtn = page.getByRole("button", {name: 'Mouse Hover'});

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(hideShowTextBox).toBeVisible();
    await hideBtn.click();
    await expect(hideShowTextBox).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await confirmBtn.click();
    await mouseHoverBtn.hover();
})