import { test } from '@playwright/test';
import { createCustomerPageHelpers } from '../../../pageObjects/customerPage';
require('dotenv').config();

test('Create a new claim and delete it', async ({ page }) => {
  const { createClaim, deleteClaim } = createCustomerPageHelpers(page);

  await createClaim();
  await deleteClaim();
});
