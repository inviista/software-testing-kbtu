import { test, expect } from '../fixtures/pages.fixture';

test('TC-04 the comparison shows both products at their own prices', async ({
  catalogPage,
  productPage,
  comparisonPage,
}) => {
  await catalogPage.open();
  await catalogPage.openProduct('Hammer');
  const first = await productPage.readNameAndPrice();
  await productPage.addToComparison();

  await catalogPage.open();
  await catalogPage.openProduct('Claw Hammer');
  const second = await productPage.readNameAndPrice();
  await productPage.addToComparison();

  await productPage.openComparison();

  // The table shows exactly these two products, at the prices from their product pages.
  await expect(comparisonPage.productNames).toHaveText([first.name, second.name]);
  await expect(comparisonPage.prices).toHaveText([`$${first.price.toFixed(2)}`, `$${second.price.toFixed(2)}`]);
});
