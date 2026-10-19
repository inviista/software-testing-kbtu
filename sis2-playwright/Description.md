# Description

## What I want to do

I want to write automated tests for the Toolshop website (https://practicesoftwaretesting.com) using Playwright and TypeScript.

The tests should check the five main things a customer does on the site: register, log in, buy something, compare products, and reset a password.

I want the tests to:
- run with one command: `npx playwright test`;
- not depend on each other, so each test makes its own user;
- really check something. Every test ends with a check that fails if the site behaves wrong.

## Test cases I will automate

1. **Register.** Fill in the registration form with a new email. Then log in with that email and password, and check that the account page opens.

2. **Log in.**
   - With the correct password: the account page opens.
   - With a wrong password: the error «Invalid email or password» appears and I stay on the login page.

3. **Buy a product.** Open a product that is in stock and add 2 of it to the cart. Check that the cart shows this product, quantity 2, and the right total price. Then go through checkout with «Cash on Delivery» and check that the order really went through: the cart is empty, and the order appears in «My invoices» with the right total.

4. **Compare two products.** Open «Hammer» and «Claw Hammer», remember their names and prices, and add both to the comparison. Check that the comparison page shows both products with the same prices.

5. **Reset a password.**
   - With a registered email: a confirmation appears, and after that the old password no longer works.
   - With an email that does not exist: the error «The selected email is invalid.» appears.

## What I will not automate

- **Logging in with the shared demo accounts** (`customer@practicesoftwaretesting.com`). All students use them, and they were already locked when I started.
- **Paying by card.** Cash on Delivery is enough to check that checkout works.
- **Checking every field of the registration form.** This is not one of the five required cases.
