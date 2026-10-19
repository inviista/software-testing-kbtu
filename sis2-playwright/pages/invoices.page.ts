import { Locator, Page } from '@playwright/test';

export class InvoicesPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/account/invoices');
  }

  // A row in the «My invoices» table with an invoice number and this total.
  invoiceWithTotal(total: string): Locator {
    return this.page.getByRole('row').filter({ hasText: 'INV-' }).filter({ hasText: total });
  }
}
