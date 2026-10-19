import { test, expect } from '../fixtures/pages.fixture';
import { createUser } from '../data/user.factory';

test('TC-01 a new customer can register and then log in', async ({ page, registerPage, loginPage }) => {
  const user = createUser();

  await registerPage.open();
  await registerPage.register(user);
  await expect(page).toHaveURL(/\/auth\/login/);

  // Logging in with the new credentials proves the account was really created.
  await loginPage.signIn(user);
  await expect(page).toHaveURL(/\/account/);
});
