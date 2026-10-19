import { Page } from '@playwright/test';

export class CatalogPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  // Search for the product, then click the card with exactly this name.
  async openProduct(name: string) {
    await this.page.getByTestId('search-query').fill(name);
    await this.page.getByTestId('search-submit').click();
    await this.page.getByRole('heading', { name, exact: true }).click();
  }

  // Stock changes as people buy, so the purchase test takes any product that is in stock.
  async openFirstInStockProduct() {
    await this.page
      .getByRole('link')
      .filter({ has: this.page.getByTestId('product-name') })
      .filter({ hasNot: this.page.getByTestId('out-of-stock') })
      .first()
      .click();
  }
}
