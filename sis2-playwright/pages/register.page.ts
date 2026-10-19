import { Page } from '@playwright/test';
import { User } from '../data/user.factory';

export class RegisterPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/auth/register');
  }

  async register(user: User) {
    const field = (id: string) => this.page.getByTestId(id);
    await field('first-name').fill(user.firstName);
    await field('last-name').fill(user.lastName);
    await field('dob').fill('1999-05-12');
    await field('country').selectOption('KZ');
    await field('postal_code').fill('050000');
    await field('house_number').fill('10');
    await field('street').fill('Abay Avenue');
    await field('city').fill('Almaty');
    await field('state').fill('Almaty');
    await field('phone').fill('77001234567');
    await field('email').fill(user.email);
    await field('password').fill(user.password);
    await field('register-submit').click();
  }
}
