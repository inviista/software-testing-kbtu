import { expect, Locator, Page } from '@playwright/test';
import { address } from '../data/user.factory';

export class CheckoutPage {
  readonly paymentSuccess: Locator;
  readonly cartBadge: Locator;

  constructor(private page: Page) {
    this.paymentSuccess = page.getByTestId('payment-success-message');
    this.cartBadge = page.getByTestId('cart-quantity');
  }

  async continueAsSignedIn() {
    await this.page.getByTestId('proceed-2').click();
  }

  async continueWithProfileAddress() {
    await expect(this.page.getByTestId('house_number')).toHaveValue(address.house_number);
    await this.page.getByTestId('proceed-3').click();
  }

  async payCashOnDelivery() {
    await this.page.getByTestId('payment-method').selectOption({ label: 'Cash on Delivery' });
    await this.page.getByTestId('finish').click();
  }

  async confirmOrder() {
    await this.page.getByTestId('finish').filter({ hasText: 'Confirm' }).click();
  }
}
