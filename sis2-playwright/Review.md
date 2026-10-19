# Review

This file explains what the AI produced, how I checked it, what was changed, and why. The prompts themselves are in [Prompt.md](Prompt.md). The sections below follow the same order.

## 1. First version (prompt 1)

From the slides and the assignment text, Claude Code did the following:
- looked at the Toolshop site to find the real `data-test` attributes;
- wrote the page objects, the fixture, the user factory and the five spec files;
- ran the tests.

The first runs failed several times. Each failure came from how the shared demo site behaves, not from a typo, and each needed a design decision:

| What went wrong | Why | What we did |
|-----------------|-----|-------------|
| Could not log in as `customer@practicesoftwaretesting.com` | All students use this account, and it was locked: «too many failed attempts» | Every test creates its own new user through the API |
| A password reset changes the password for real (to `welcome02`) | That is how this site works | The reset test always resets its own new user, never a shared account |
| The order was rejected: «The city does not belong to the selected country» | The server compares the city with its own postcode lookup, and for Kazakhstan the lookup returns placeholder data | Test users get a Dutch address (NL, 1012NX, house 1) that matches the lookup |
| At checkout the address sometimes changed back while the test was typing | The site refills the form from the user's profile several times | The test does not type the address. It is saved in the profile, and the test waits until the form shows it |
| The purchase test could not set the quantity | The product «Claw Hammer» went out of stock, because people (and these tests) buy it | The test buys the first product that is in stock |
| Product IDs found earlier stopped working | The site resets its database now and then | Products are always found by name, never by ID |
| Sometimes a page loaded slowly | Shared public server | Assertions wait up to 15 s, and a failed test is retried once |

About the retry: slide 19 retries only in CI. I also retry once locally, so that a slow moment on the public server does not turn the teacher's run red. A retried test is still marked *flaky* in the report, so the problem stays visible.

## 2. Simplification (prompt 2)

The first version worked, but it had more code than the task needed, and some of it I could not explain well. After my question, these parts were removed:

| Removed | Why it was not needed |
|---------|-----------------------|
| An extra test «duplicate email is rejected» | Not in the brief |
| Two small page objects (`base`, `account`) | Too little in them to be separate files |
| Checks of API status codes in the reset test | The message on the page and the old-password check already prove the result |
| Repeating the registration request on server errors | The retry in the config already covers it |
| TypeScript type checking setup | Playwright runs TypeScript without it |
| Long comments | Kept only where the reason is not obvious |

## 3. Check against the task (prompt 3)

I sent a precise description of the five scenarios. Every scenario already had a test; the mapping table is in Prompt.md. Nothing had to change.

## 4. Check against the week 5 rules (prompt 4)

I sent the rules from week 5, slide 49. One problem was found:

- **The order confirmation was found by its text (`getByText`).** The rules allow only `getByTestId`, `getByRole` and `getByLabel`. The confirmation has no `data-test` and no role, so none of them can reach it.
- **The fix:** the test now proves the order went through in two allowed ways:
  1. the cart badge disappears (`getByTestId('cart-quantity')`);
  2. the order appears in «My invoices» with the right total (`getByRole('row')`).

  This is a stronger check, because it shows the order was saved, not just that a message appeared. In a real team I would ask the developers to add a `data-test` to the confirmation (week 5, slide 38).

All the other rules were already met. The rule-by-rule table is in Prompt.md.

## 5. Do the tests really check something?

Slide 50 says: break the expected value on purpose and look at the failure. I did this for three checks:

| Test | Changed the expectation to | Result |
|------|----------------------------|--------|
| TC-02 wrong password | a different error text | Failed: `Expected: "Some other error text"`, `Received: "Invalid email or password"` |
| TC-03 cart total | 3 × price instead of 2 × price | Failed: `Expected: "$42.45"`, `Received: "$28.30"` |
| TC-03 order in «My invoices» | a total of $9999.99 | Failed: `Expected: 1`, `Received: 0` |

Every failure says clearly what is wrong. The broken copies were deleted afterwards.

Slide 27 also suggests running against the buggy build `with-bugs.practicesoftwaretesting.com`. I tried, but that build runs an older API, for example with a different address format at registration. The tests fail there before reaching any planted bug, so that run proves nothing, and I used the check above instead.

## 6. Problems I found in the application

- After a password reset, the confirmation shows the raw key `page.forgot-password.confirm` instead of a message.
- At checkout, the postcode lookup returns nonsense for Kazakhstan, for example «Lake Daniela, California».
- The order confirmation has no `data-test`, which makes it hard to test.

## 7. My own review

**What I read and understood.**
- I went through every spec file and page object. I can explain why the specs contain no locators: if the site changes a button, only the page object has to change, not every test.
- I understood why each test creates its own user. On a shared site you cannot trust anybody else's data: the demo accounts were locked by other people, and a password reset really changes the password.
- I understood the difference between waiting for a fixed time and waiting for a condition. `waitForTimeout` guesses; `expect(...).toHaveText(...)` keeps checking until it is true.

**What I changed or asked to change.**
- The first result showed 9 tests while the brief asks for 5 test cases, so I asked why. It turned out the one-time login step and the valid/invalid pairs are counted separately.
- The first version was too complicated for me to explain, so I asked for a simpler one. Several files and checks were removed (section 2).
- I checked the code against the week 5 rules (prompt 4). This found the `getByText` locator, which was then replaced (section 4).


**What I would do differently.**
- I would give the AI the rules from the start, not at the end. A short first prompt like mine lets the model choose things the course does not allow, such as the `getByText` locator.
- I would write my own Description.md and list of test cases first, and only then ask for code. That way the tests follow my plan, not the model's.
- I would check the shared demo accounts before planning tests around them. The slides suggested using them, but they did not work.

**Screenshots.** The AI conversation, the test report and the run output are in [`screenshots/`](screenshots/).
