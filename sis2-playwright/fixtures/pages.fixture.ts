import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CatalogPage } from '../pages/catalog.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ComparisonPage } from '../pages/comparison.page';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { InvoicesPage } from '../pages/invoices.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { RegisterPage } from '../pages/register.page';
import { createUser, User } from '../data/user.factory';
import { registerViaApi } from '../data/api';

type Fixtures = {
  cartPage: CartPage;
  catalogPage: CatalogPage;
  checkoutPage: CheckoutPage;
  comparisonPage: ComparisonPage;
  forgotPasswordPage: ForgotPasswordPage;
  invoicesPage: InvoicesPage;
  loginPage: LoginPage;
  productPage: ProductPage;
  registerPage: RegisterPage;
  registeredUser: User; // an account created for this test only
};

export const test = base.extend<Fixtures>({
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  catalogPage: async ({ page }, use) => use(new CatalogPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  comparisonPage: async ({ page }, use) => use(new ComparisonPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  invoicesPage: async ({ page }, use) => use(new InvoicesPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),

  registeredUser: async ({ request }, use) => {
    const user = createUser();
    await registerViaApi(request, user);
    await use(user);
  },
});

export { expect } from '@playwright/test';
