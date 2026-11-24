const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {

    const viewBtn = page.getByRole("button", { name: "View" }).first();
    const email = page.locator("[id='userEmail']");
    const password = page.locator("[id='userPassword']");
    const submitBtn = page.locator("[id='login']");
    const firstCardName = page.locator(".card-body h5").first();
    const myOrdersButton = page.locator("button[routerlink*='myorders']");
    const notAuthorizedMsg = page.getByText('You are not authorize to view');

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill("batroukhhamza@gmail.com");
    await password.fill("Test1234");
    await submitBtn.click();
    await page.waitForLoadState("networkidle");
    // or alternatively this could be used instead of networkidle
    await firstCardName.waitFor();
    // console.log(await firstCardName.textContent());

    await myOrdersButton.click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=687687678587657658" })
    );
    await viewBtn.click();
    // await page.pause();
    await expect(notAuthorizedMsg).toBeVisible();
})