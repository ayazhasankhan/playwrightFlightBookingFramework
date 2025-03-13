import { Page, Locator, Response, expect } from "@playwright/test";

export class FlightSearchPage {
    readonly page: Page;
    readonly languagePickerButton: Locator;
    readonly englishUKButton: Locator;
    readonly oneWayOption: Locator;
    readonly toInput: Locator;
    readonly searchDestination: Locator;
    readonly checkBox: Locator;
    readonly chooseDepartureDate: Locator;
    readonly backToCurrentMonth: Locator;
    readonly passengerButton: Locator;
    readonly increaseAdultButton: Locator;
    readonly doneButton: Locator;
    readonly searchButton: Locator;
    readonly errorMessage: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.languagePickerButton = page.getByTestId('header-language-picker-trigger');
        this.englishUKButton = page.getByRole('button', { name: 'English (UK)' });
        this.oneWayOption = page.locator('label').filter({ hasText: 'One way' }).locator('span').nth(1);
        this.toInput = page.getByRole('button', { name: 'Where to?' });
        this.searchDestination = page.getByRole('combobox', { name: 'Airport or city' });
        this.checkBox = page.locator('[class="InputCheckbox-module__field___NCLTm"]').nth(1);

        this.chooseDepartureDate = page.locator('[placeholder="Choose departure date"]');
        this.backToCurrentMonth = page.getByRole('button').first();

        this.passengerButton = page.getByRole('button', { name: 'adult' });
        this.increaseAdultButton = page.locator('div').filter({ hasText: /^1$/ }).locator('button').nth(1);
        this.doneButton = page.getByRole('button', { name: 'Done' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.errorMessage = page.getByRole('button', { name: 'Add an airport or city' });

        
    }

    async goToFlightSearch() {
        await this.page.goto("https://www.booking.com/flights/index.en-gb.html");
    }

    async selectEnglishUK() {
        await this.languagePickerButton.click();
        await this.englishUKButton.click();
    }

    async selectOneWayTrip() {
        await this.oneWayOption.click();
    }

    async enterDestination() {
        await this.toInput.click();
        await this.searchDestination.fill('BOM');
        await this.checkBox.click();
    }

    async selectDate(date: string) {
        const xpath = `//span[@aria-label="${date}"]`;
        await this.page.locator(xpath).click();
    }

    async enterTravellDate(date: string){
       await this.chooseDepartureDate.click();
       await this.backToCurrentMonth.click();
       const xpath = `//span[@aria-label="${date}"]`;
       await this.page.locator(xpath).click();
    }

    async selectPassengers(adultCount: number) {
        await this.passengerButton.click();

        for (let i = 1; i < adultCount; i++) { // Assuming default is 1, increase to desired count
            await this.increaseAdultButton.click();
        }

        await this.doneButton.click();
    }

    async searchFlights() {
        await this.searchButton.click();
    }

    async clickSearchAndWaitForResponse() {
        const [response] = await Promise.all([
            this.page.waitForResponse((resp: Response) => {
                return resp.url().includes("/flights") && resp.status() === 200;
            }),
            this.searchButton.click(),
        ]);

        console.log(`Search request completed with status: ${response.status()}`);
        return response;
    }

    async validateErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }
}