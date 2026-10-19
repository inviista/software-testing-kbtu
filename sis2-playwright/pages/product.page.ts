import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly cartQuantity: Locator;

  constructor(private page: Page) {
    this.cartQuantity = page.getByTestId('cart-quantity');
  }

  // Name and price as the customer sees them.
  async readNameAndPrice() {
    const price = this.page.getByTestId('unit-price');
    await expect(price).toHaveText(/\d/); // the price loads after the page
    return {
      name: (await this.page.getByTestId('product-name').innerText()).trim(),
      price: Number(await price.innerText()),
    };
  }

  async addToCart(quantity: number) {
    await this.page.getByTestId('quantity').fill(String(quantity));
    await this.page.getByTestId('add-to-cart').click();
  }

  async addToComparison() {
    await this.page.getByTestId('add-to-compare').click();
  }

  async openComparison() {
    await this.page.getByTestId('compare-link').click();
  }
}
