export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// A new user every call: the timestamp + random number make the email unique.
export function createUser(): User {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    firstName: 'Aldiyar',
    lastName: 'Tester',
    email: `sis2.${id}@example.com`,
    password: `Sis2!Pass#${id.slice(-5)}`,
  };
}

// Address saved in every test user's profile. At checkout the server accepts only a city
// that matches the site's own postcode lookup, and for NL 1012NX house 1 the lookup gives
// exactly this street and city (for Kazakhstan it returns placeholder data).
export const address = {
  street: 'Malikhof',
  house_number: '1',
  city: 'Dussen',
  state: 'Drenthe',
  country: 'NL',
  postal_code: '1012NX',
};
