import { test, expect } from '../fixtures/pages.fixture';
import { AUTH_FILE } from '../playwright.config';

test.use({ storageState: AUTH_FILE }); // already logged in (see auth.setup.ts)

test('TC-03 buy two units of a product', async ({
  catalogPage,
  productPage,
  cartPage,
  checkoutPage,
  invoicesPage,
}) => {
  await catalogPage.open();
  await catalogPage.openFirstInStockProduct();
  const product = await productPage.readNameAndPrice();

  await productPage.addToCart(2);
  await expect(productPage.cartQuantity).toHaveText('2');

  await cartPage.open();
  await expect(cartPage.productTitle).toHaveText(product.name);
  await expect(cartPage.quantity).toHaveValue('2');
  const total = `$${(product.price * 2).toFixed(2)}`;
  await expect(cartPage.total).toHaveText(total);

  await cartPage.proceed();
  await checkoutPage.continueAsSignedIn();
  await checkoutPage.continueWithProfileAddress();
  await checkoutPage.payCashOnDelivery();
  await expect(checkoutPage.paymentSuccess).toHaveText('Payment was successful');
  await checkoutPage.confirmOrder();

  // The order went through: the cart is emptied, and the invoice is in «My invoices».
  await expect(checkoutPage.cartBadge).toBeHidden();
  await invoicesPage.open();
  await expect(invoicesPage.invoiceWithTotal(total)).toHaveCount(1);
});
