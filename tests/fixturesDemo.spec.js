const { test, expect, request } = require('@playwright/test');
const { customTest } = require("./utils/fixtures.js");


customTest.only("Fixtures demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {


    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    const myOrdersButton = authenticatedPage.locator("button[routerlink*='myorders']");
    await myOrdersButton.click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
})