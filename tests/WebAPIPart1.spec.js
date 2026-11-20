const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {"userEmail": "batroukhhamza@gmail.com", "userPassword": "Test1234"};
const orderPayload = {"orders":[{"country":"United States","productOrderedId":"6960eae1c941646b7a8b3ed3"}]}
let token;
let orderId;


test.beforeAll( async() => {

    // Login API

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    apiUtils.createOrder(orderPayload)

});

test.beforeEach( () => {

})



test.only('Place the order', async ({page})=>
    { 

        const apiutils = new APIUtils(apiContext, loginPayload);
        const orderId = createOrder(orderPayload);


        await page.addInitScript(value => {
     
            window.localStorage.setItem('token',value);
        }, response.token );
    await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
     
     
    for(let i =0; i<await rows.count(); ++i)
    {
       const rowOrderId =await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId))
       {
           await rows.nth(i).locator("button").first().click();
           break;
       }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
     
    })