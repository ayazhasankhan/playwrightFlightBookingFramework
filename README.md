# Playwright Testing

# Running Tests

Important: Playwright is installed in the `root`, so the following commands should also be used in the root:

To run all tests: `npx playwright test`


To run a single test file: `npx run playwright test partial-name-of-spec` i.e. `npx run playwright test Bed`.



# Debugging

On certain occasions, you may want to debug a test. To do so, use `--debug` which would open a browser window and allow you to interact with the page.

To debug a single spec file run `npx test:debug partial-name-of-spec` ie: `npx test:debug mapViewBoundary.spec.ts`

# Test results

When a pull request is created and the playwright tests run, the results will be available in the `Tests` tab in CircleCI and an html report will be available for each parallel run in the `artifacts` tab.

After running the tests on your local, you can also use `npx test:report`

# Page Objects

Page objects should stay inside [Page](https://playwright.dev/docs/test-pom/) files. You can use any of the options listed in the playwright [documentation](https://playwright.dev/docs/selectors) as element selectors, but the recommendations are ids/testids, aria-labels and non-dynamic selectors.


# Making Tests Reliable

Playwright includes auto-wait logic to make it easier to avoid synchronization issues.

However, clicking elements that trigger asynchronous processing before initiating navigation can cause a race condition that leads to intermittent failures. It is [recommended](https://playwright.dev/docs/navigations#asynchronous-navigation) to resolve cases like this by using `page.waitForNavigation([options])`:

```javascript
/* Note that Promise.all prevents a race condition between clicking and waiting for a navigation,
 and that waitForNavigation is intentionally placed before the click. */
await Promise.all([page.waitForNavigation(), page.click('div.with-delayed-navigation')]);
```
# Assertions

`Playwright Test` uses [(Jest's) expect library](https://jestjs.io/docs/expect) for [test assertions](https://playwright.dev/docs/test-assertions). It provides a lot of matchers like `toEqual`, `toContain`, `toMatch`, `toMatchSnapshot` and many more.

Playwright also offers web-first assertions that will wait until the expected condition is met.

Find out more in the [assertions guide](https://playwright.dev/docs/test-assertions).

# Configuration

The test configuration file for this project is located [here](../../playwright.config.js).

The number of workers is currently set as `2` to avoid timeouts in CircleCI, as test flakiness was observed when this number was increased.

For more information on configuration options, please refer to the [documentation](https://playwright.dev/docs/test-intro#create-a-configuration-file).
