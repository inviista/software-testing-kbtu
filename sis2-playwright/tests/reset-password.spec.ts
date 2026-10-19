import { test, expect } from '../fixtures/pages.fixture';

// A new user is reset every time. Never reset the shared customer@… accounts:
// on this site a reset really changes the password.
test('TC-05 a known email gets a confirmation and the old password stops working', async ({
  forgotPasswordPage,
  loginPage,
  registeredUser,
}) => {
  await forgotPasswordPage.open();
  await forgotPasswordPage.requestReset(registeredUser.email);
  await expect(forgotPasswordPage.message).toBeVisible();
  await expect(forgotPasswordPage.message).not.toContainText('invalid');

  // The reset really happened: the old password no longer works.
  await loginPage.open();
  await loginPage.signIn(registeredUser);
  await expect(loginPage.error).toHaveText('Invalid email or password');
});

test('TC-05 an unknown email shows an error', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.open();
  await forgotPasswordPage.requestReset(`nobody.${Date.now()}@example.com`);

  await expect(forgotPasswordPage.message).toHaveText('The selected email is invalid.');
});
