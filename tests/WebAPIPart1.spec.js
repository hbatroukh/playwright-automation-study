const {test, expect, request} = require('@playwright/test');
const loginPayload = {"userEmail": "batroukhhamza@gmail.com", "userPassword": "Test1234"}

test.beforeAll( async() => {

    const apiContext = await request.newContext();
    
    const loginResponse = apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = (await loginResponse).json();
        const token = loginResponseJson.token;
});

test.beforeEach( () => {

})



test('Client App Login', async ({page}) =>{

})