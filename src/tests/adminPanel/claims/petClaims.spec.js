import { test } from '@playwright/test';
import { createClaim, deleteClaim } from '../../../pageObjects/customerPage';
require('dotenv').config();

test('Create a new claim and delete it', async ({ page }) => {
  await createClaim(page);
  await deleteClaim(page);
});
