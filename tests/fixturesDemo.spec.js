const { test, expect, request } = require('@playwright/test');
const {customTest} = require("./utils/fixtures.js");


customTest("Fixtures demo", async({authenticatedPage}) =>{


    authenticatedPage.goto("https://rahulshettyacademy.com/client");
})