const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');

test('Automation Practice first item', async ({ page }) => {
    const firstCardName = page.locator(".card-body h5").first();
    const products = page.locator(".card-body");
    const loginPage = new LoginPage(page);
    const productName = 'ZARA COAT 3'
    const cartButton = page.locator("[routerLink*='cart']");
    const zaraCoatName = page.locator(`h3:has-text("${productName}")`);
    const checkoutButton = page.locator("text=Checkout");
    const countrySelector = page.getByPlaceholder("Select Country");
    const selectProperCountry = page.getByRole("button", { name: /United States$/ });
    const emailLabel = page.getByText("batroukhhamza@gmail.com");
    const placeOrderBtn = page.getByText("Place Order");
    const thankYouForYourOrderText = page.getByText(" Thankyou for the order. ");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const myOrdersButton = page.locator("button[routerlink*='myorders']");
    const listOfOrderIds = page.locator("tbody tr th");
    const orderRows = page.locator("tbody tr");
    const email = "batroukhhamza@gmail.com";
    const password = "Test1234";
    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    await page.waitForLoadState("networkidle");
    // or alternatively this could be used instead of networkidle
    await firstCardName.waitFor();
    console.log(await firstCardName.textContent());

    //Zara Coat 3
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await cartButton.click();
    await expect(zaraCoatName).toBeVisible();

    await checkoutButton.click();
    await countrySelector.pressSequentially("United S", { delay: 150 });
    await selectProperCountry.click();

    await expect(emailLabel).toBeVisible();
    await placeOrderBtn.click();

    await expect(thankYouForYourOrderText).toBeVisible();
    console.log(await orderId.textContent());
    const orderIdText = await orderId.textContent();

    await myOrdersButton.click();
    await orderRows.first().waitFor();

    const listOfIds = await listOfOrderIds.count();
    for (let i = 0; i < listOfIds; i++) {
        if (orderIdText.includes((await listOfOrderIds.nth(i).textContent()).trim())) {
            await orderRows.nth(i).locator("button.btn-primary").click();
            break;
        }
    }
});