import { Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly message: Locator;

  constructor(private page: Page) {
    this.message = page.getByTestId('forgot-password-form').getByRole('alert');
  }

  async open() {
    await this.page.goto('/auth/forgot-password');
  }

  async requestReset(email: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('forgot-password-submit').click();
  }
}
