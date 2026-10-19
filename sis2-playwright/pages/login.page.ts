import { Locator, Page } from '@playwright/test';
import { User } from '../data/user.factory';

export class LoginPage {
  readonly error: Locator;

  constructor(private page: Page) {
    this.error = page.getByTestId('login-error');
  }

  async open() {
    await this.page.goto('/auth/login');
  }

  async signIn(user: Pick<User, 'email' | 'password'>) {
    await this.page.getByTestId('email').fill(user.email);
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByTestId('login-submit').click();
  }
}
