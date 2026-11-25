class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[id='login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("[id='userPassword']");
    }

    async goTo() {

        await this.page.goto("https://rahulshettyacademy.com/client");
    }


    async validLogin(userName, password) {

        await this.userName.type(userName);
        await this.password.type(password);
        await this.signInButton.click();
    }
}

module.exports = { LoginPage };