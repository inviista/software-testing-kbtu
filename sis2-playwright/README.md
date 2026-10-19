# SIS 2 — Test automation with Playwright

Automated tests for the Toolshop demo site, <https://practicesoftwaretesting.com>, written in TypeScript with Playwright.

Software Testing and Debugging · KBTU 2026

## How to run

You need Node.js 18 or newer.

```bash
npm install
npx playwright install chromium
npx playwright test
```

Expected result: **8 passed**.

Useful commands:

| Command | What it does |
|---------|--------------|
| `npx playwright test --ui` | Opens UI mode: run the tests step by step and see the page at each step |
| `npx playwright test --headed` | Runs the tests in a visible browser |
| `npx playwright show-report` | Opens the report of the last run |

## What is tested

| # | Test case | File | What it checks |
|---|-----------|------|----------------|
| TC-01 | Register | `tests/register.spec.ts` | A new user can register and then log in with the new password |
| TC-02 | Log in | `tests/login.spec.ts` | Correct password: the account page opens. Wrong password: an error, still on the login page |
| TC-03 | Buy a product | `tests/buy-product.spec.ts` | 2 items in the cart with the right total. Checkout completes, the cart is emptied, and the order appears in «My invoices» |
| TC-04 | Compare two products | `tests/compare-products.spec.ts` | The comparison page shows both products with the prices from their own pages |
| TC-05 | Reset a password | `tests/reset-password.spec.ts` | Known email: confirmation, and the old password stops working. Unknown email: an error |

Why 8 results for 5 test cases:
- Login and password reset each have two tests, a valid case and an invalid case, because the brief asks for both.
- One more result is `auth.setup.ts`, a one-time login before the tests. It is not a test case.

More detail: [Description.md](Description.md).

## Project structure

```
tests/          the tests, one file per test case; no locators here
  auth.setup.ts   logs in once and saves the session for the purchase test
pages/          page objects, one per screen; all locators are here
fixtures/       gives page objects and a fresh user to every test
data/           creates unique users and registers them through the API
playwright.config.ts
```

## Main decisions

1. **Every test makes its own user.** The shared demo accounts were locked, and a password reset on this site really changes the password.
2. **Only `getByTestId` and `getByRole` locators.** No CSS and no XPath. The site marks elements with `data-test`, so the config sets `testIdAttribute: 'data-test'`.
3. **No fixed waits (`waitForTimeout`).** Playwright assertions wait by themselves until the condition is true.
4. **No hard-coded data that can change.** The site is shared and its data changes: the purchase test buys any product that is in stock, and prices are read from the page.
5. **One retry, also when running locally.** The public site is sometimes slow. A retried test is still marked *flaky* in the report.

## Documents

- [Description.md](Description.md): what I want to test and the list of test cases
- [Prompt.md](Prompt.md): the AI tool and the exact prompts
- [Review.md](Review.md): what the AI produced, how I checked it, and what was changed
- [screenshots/](screenshots/): test report and run output
