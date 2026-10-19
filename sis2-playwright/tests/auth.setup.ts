import { test as setup, expect } from '../fixtures/pages.fixture';
import { AUTH_FILE } from '../playwright.config';

setup('log in once', async ({ page, loginPage, registeredUser }) => {
  await loginPage.open();
  await loginPage.signIn(registeredUser);
  await expect(page).toHaveURL(/\/account/);
  await page.context().storageState({ path: AUTH_FILE });
});
