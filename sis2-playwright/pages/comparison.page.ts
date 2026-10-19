import { Locator, Page } from '@playwright/test';

export class ComparisonPage {
  readonly productNames: Locator;
  readonly prices: Locator;

  constructor(page: Page) {
    this.productNames = page.getByTestId('comparison-table').getByTestId('product-name');
    this.prices = page.getByTestId('compare-price');
  }
}
