const {test, expect} = require('@playwright/test');


test.only("Popup validations", async ({page}) => {

    const hideShowTextBox = page.getByPlaceholder("Hide/Show Example");
    const hideBtn = page.getByRole("button", {name: 'Hide'});
    const confirmBtn = page.getByRole("button", {name: 'Confirm'});
    const mouseHoverBtn = page.getByRole("button", {name: 'Mouse Hover'});
    const iframe = page.frameLocator("#courses-iframe");
    const allAccessPlan = iframe.getByRole("navigation").getByRole("link", {name: 'All Access Plan'});
    const subscribersText = iframe.getByRole("heading", {name: /Happy Subscibers!/})

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(hideShowTextBox).toBeVisible();
    await hideBtn.click();
    await expect(hideShowTextBox).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await confirmBtn.click();
    await mouseHoverBtn.hover();
    await allAccessPlan.click();
    await expect(subscribersText).toBeVisible();

})