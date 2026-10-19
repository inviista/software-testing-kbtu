import { test, expect } from '../fixtures/pages.fixture';

test('TC-02 valid credentials open the account page', async ({ page, loginPage, registeredUser }) => {
  await loginPage.open();
  await loginPage.signIn(registeredUser);

  await expect(page).toHaveURL(/\/account/);
});

test('TC-02 a wrong password shows an error', async ({ page, loginPage, registeredUser }) => {
  await loginPage.open();
  await loginPage.signIn({ email: registeredUser.email, password: 'WrongPassword1!' });

  await expect(loginPage.error).toHaveText('Invalid email or password');
  await expect(page).toHaveURL(/\/auth\/login/);
});
