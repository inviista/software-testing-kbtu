import { APIRequestContext, expect } from '@playwright/test';
import { API_URL } from '../playwright.config';
import { address, User } from './user.factory';

// Creates the account through the API. Used only to prepare data for a test;
// the registration form itself is tested through the UI in register.spec.ts.
export async function registerViaApi(request: APIRequestContext, user: User) {
  const response = await request.post(`${API_URL}/users/register`, {
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      dob: '1999-05-12',
      phone: '77001234567',
      email: user.email,
      password: user.password,
      address,
    },
  });
  expect(response.status()).toBe(201);
}
