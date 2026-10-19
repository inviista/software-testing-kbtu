# Prompt.md

## Tool

| | |
|---|---|
| Tool | Claude Code (Claude desktop app, Code tab) |
| Model | Claude Opus 5.5 (`claude-opus-5-5`) |
| Effort level | _fill in from the model selector in the app_ |
| Date | 19 October 2026 |

Claude Code worked directly in the project folder. It could run commands, open the website in a browser, write the files and run the tests.

## The prompts I used

My prompts were in Russian. They are copied exactly below, each with an English translation.

### 1. The task

I attached the week 6 slides (`Week_6_Masters_ST.pptx`) and pasted the SIS 2 assignment text from the course chat.

> **помоги сделать задание**
> *(Help me do the assignment.)*
>
> SIS 2 — Test Automation with Playwright · Deadline Oct 23 · https://practicesoftwaretesting.com/
> 1. At least 5 AT suites mentioned in the presentation, any language with the Playwright framework.
> 2. Description.md: explain what you want to do; list of TCs to be automated.
> 3. Prompt.md: save exactly the prompt you used for the AI tool; mark exactly which tool.
> 4. Review.md: explain what the AI results were about, how you reviewed and modified them, and justify your decisions.
> 5. Screenshots: AI response, run results, or whatever matters.
> 6. Link to a public GitHub repository.
> 7. Google Forms link.

### 2. Asking for simpler code because of troubles with ToolShop

> **не слишком ли ты усложнил код**
> *(Isn't the code too complicated?)*

The model removed the parts that were not needed.

### 3. Checking the suite against a precise task

At the end I sent a precise description of the task, to check that the finished suite matches it.

> **Напиши набор тестов на Playwright на TypeScript для https://practicesoftwaretesting.com,
> охватывающий следующие пять тестовых сценариев: регистрация, вход в систему (корректный и некорректный), покупка товара,
> сравнение двух товаров, сброс пароля (для известных и неизвестных адресов электронной почты).**
>
> *(Write a Playwright test suite in TypeScript for https://practicesoftwaretesting.com covering these five test
> scenarios: registration, login (valid and invalid), buying a product, comparing two products, password reset
> (for known and unknown email addresses).)*

The suite already existed, so the model checked it against this task instead of writing a new one. Every scenario is covered:

| Scenario in the prompt | Test |
|---|---|
| Registration | TC-01 a new customer can register and then log in |
| Login, valid | TC-02 valid credentials open the account page |
| Login, invalid | TC-02 a wrong password shows an error |
| Buying a product | TC-03 buy two units of a product |
| Comparing two products | TC-04 the comparison shows both products at their own prices |
| Password reset, known email | TC-05 a known email gets a confirmation and the old password stops working |
| Password reset, unknown email | TC-05 an unknown email shows an error |

Run result: 8 passed (the 7 tests plus the one-time login step).

### 4. Checking the suite against explicit rules

Then I sent the rules from week 5 (slide 49, «A prompt with the rails on»), copied exactly:

```
Rules:
- Use only getByTestId (the site uses data-test), getByRole, getByLabel. Never CSS or XPath.
- No waitForTimeout. Use web-first assertions that retry.
- One behaviour per test. The test name must state the requirement.
- All page interaction goes in page objects, given to tests through a fixture.
  No locator in any spec file.
- Every test creates its own data. Emails must be unique per run.
- If a test case does not state the expected result, write TODO-ORACLE and stop.
  Do not invent an assertion.
```

The model checked the suite rule by rule:

| Rule | Result |
|---|---|
| Only `getByTestId`, `getByRole`, `getByLabel` | **One violation found.** The order confirmation was found with `getByText(/Thanks for your order/)`. This element has no `data-test` and no role, only `id="order-confirmation"`, and reaching it would need a CSS selector. **Fixed:** the purchase test now proves the order went through in two allowed ways: the cart badge (`getByTestId('cart-quantity')`) disappears, and the «My invoices» table has a row (`getByRole('row')`) with an `INV-` number and the expected total. In a real team, the right fix is to ask the developers for a `data-test` on the confirmation (week 5, slide 38). |
| No `waitForTimeout`; web-first assertions | OK. None in the project; all checks use `await expect(...)` |
| One behaviour per test; name states the requirement | OK. Every name says what must be true. TC-03 checks one journey (cart → checkout → invoice), as the brief defines it |
| Page objects through a fixture; no locator in specs | OK. `fixtures/pages.fixture.ts`; a search for `getBy`/`locator(` in `tests/` finds nothing |
| Own data; unique emails | OK. `registeredUser` creates a new account per test; `createUser()` adds a timestamp and a random number to the email |
| TODO-ORACLE instead of invented assertions | OK, none needed. Every expected result comes from the brief or from what the site shows. One limit: for a known email the brief only says «expected confirmation», and the site shows a raw key (`page.forgot-password.confirm`) instead of a text. So the test does not check the wording. It checks that the message is not an error and that the old password stops working |

The new invoice check was also tested by putting in a wrong total on purpose: the test failed with `Expected: 1, Received: 0`. Full run after the fix: 8 passed.
