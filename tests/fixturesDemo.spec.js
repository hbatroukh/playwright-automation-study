const { test, expect, request } = require('@playwright/test');
const { customTest } = require("./utils/fixtures.js");


customTest("Fixtures demo", async ({ authenticatedPage, createOrder }) => {


    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    const myOrdersButton = authenticatedPage.locator("button[routerlink*='myorders']");
    myOrdersButton.click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
})