const {test, expect, request} = require('@playwright/test');
const loginPayload = {"userEmail": "batroukhhamza@gmail.com", "userPassword": "Test1234"};
let token;


test.beforeAll( async() => {

    const apiContext = await request.newContext();
    
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
});

test.beforeEach( () => {

})



test.only('@API Place the order', async ({page})=>
    { 
        await page.addInitScript(value => {
     
            window.localStorage.setItem('token',value);
        }, response.token );
    await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
     
     
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
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
     
    })