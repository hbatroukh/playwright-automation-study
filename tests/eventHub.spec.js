const {test, expect} = require('@playwright/test');

test('Full booking flow', async ({page}) => {

    const email = page.getByLabel("Email");
    const password = page.getByLabel("Password", {exact: true});
    const signInBtn = page.getByRole("button", {name: 'Sign in'});
    const adminDropdown = page.getByRole("button", {name: 'Admin'});
    const manageEvents = page.getByRole("navigation").getByRole("link", { name: "Manage Events" });
    const title = page.getByLabel("Title");
    const category = page.getByLabel("Category");
    const city = page.getByLabel("City");
    const venueAddress = page.getByLabel("Venue");
    const eventTime = page.getByLabel("Event Date & Time");
    const price = page.getByLabel("Price ($)");
    const totalSeats = page.getByLabel("Total Seats");
    const addEventBtn = page.getByRole("button", {name: '+ Add Event'});
    const events = page.getByTestId("nav-events");
    const halalFestCard = page.getByTestId("event-card").filter({ hasText: 'Halal fest'});
    const seatsRemaining = halalFestCard.getByText("seats available");
    const bookNowBtnHalalFest = halalFestCard.getByRole("link", {name: 'Book Now'});
    const fullNameBooking = page.getByLabel("Full Name");
    const phoneNumber = page.getByLabel("Phone Number");
    const confirmBookingBtn = page.getByRole("button", {name: 'Confirm Booking'});

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await email.fill("hamzabatroukh@gmail.com");
    await password.fill("Hamza123!");
    await signInBtn.click();
    await adminDropdown.click();
    await manageEvents.click();
    await title.fill("Halal fest");
    await category.selectOption("Festival");
    await city.fill("Chicago");
    await venueAddress.fill("8925 S Kostner Ave, Hometown, IL 60456");
    await eventTime.fill("2026-12-20T18:30");
    await price.fill("50");
    await totalSeats.fill("500");
    await addEventBtn.click();
    await events.click();
    const beforeText = await seatsRemaining.textContent();
    const seatsBefore = parseInt(beforeText);
    await bookNowBtnHalalFest.click();
    await fullNameBooking.fill("Hamza Batroukh");
    await email.fill("hamzabatroukh@gmail.com");
    await phoneNumber.fill("8002753952");
    await confirmBookingBtn.click();
    await events.click();
    await expect(seatsRemaining).toHaveText((seatsBefore-1) + " seats available");

})