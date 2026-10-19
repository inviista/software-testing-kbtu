import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly productTitle: Locator;
  readonly quantity: Locator;
  readonly total: Locator;

  constructor(private page: Page) {
    this.productTitle = page.getByTestId('product-title');
    this.quantity = page.getByTestId('product-quantity');
    this.total = page.getByTestId('cart-total');
  }

  async open() {
    await this.page.goto('/checkout');
  }

  async proceed() {
    await this.page.getByTestId('proceed-1').click();
  }
}
