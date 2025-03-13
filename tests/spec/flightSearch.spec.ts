import { test, expect } from "@playwright/test";
import { FlightSearchPage } from "../pages/FlightSearchPage";
import { getFormattedDate } from "../utils/generic/Generic";

let flightSearch: FlightSearchPage;

test.describe("Flight Search Tests", () => {

    test.beforeEach(async ({ page}) => {
        flightSearch = new FlightSearchPage(page);
        await flightSearch.goToFlightSearch();
       // await flightSearch.selectEnglishUK();
        await flightSearch.selectOneWayTrip();
      });

    test("Verify flights from DEL to BOM are displayed for today", async ({ page }) => {
        await flightSearch.enterDestination();
        const todayDate = getFormattedDate(0);
        await flightSearch.enterTravellDate(todayDate);
        await flightSearch.selectPassengers(2);
        await flightSearch.clickSearchAndWaitForResponse();
    });

    test("Verify flights from DEL to BOM are displayed for tomorrow", async ({ page }) => {
        await flightSearch.enterDestination();
        const tomarrowDate = getFormattedDate(1);
        await flightSearch.enterTravellDate(tomarrowDate);
        await flightSearch.selectPassengers(2);
        await flightSearch.clickSearchAndWaitForResponse();
    });

    test("Attempt search without entering a departure airport", async ({ page }) => {
        await flightSearch.clickSearchAndWaitForResponse();
        await flightSearch.validateErrorMessage();
    });
});