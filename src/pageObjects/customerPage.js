import { request, expect } from '@playwright/test';

export function createCustomerPageHelpers(page) {
  const APP_HOST = process.env.BASE_URL;
  const PET_CUSTOMER_ID = process.env.PET_CUSTOMER_ID;
  const AGENT_EMAIL = process.env.AGENT_EMAIL;
  const AGENT_TOKEN = process.env.AGENT_TOKEN;
  const X_API_KEY = process.env.X_API_KEY;
  async function navigateTo() {
    console.log(PET_CUSTOMER_ID);
    await page.goto(`${APP_HOST}/admin/customers/${PET_CUSTOMER_ID}`);
  }

  async function createClaim() {
    await navigateTo(page);
    await page.getByRole('button', { name: 'Mehr ' }).click();
    await page.getByText('Neuer Leistungsfall').click();
    await page.getByRole('button', { name: 'Claim anlegen' }).click();
    await page.waitForTimeout(5000);
  }

  async function deleteClaim() {
    const url = page.url();
    const claimId = url.substring(url.lastIndexOf('/') + 1);
    console.log(`Claim ID: ${claimId}`);

    const apiContext = await request.newContext({
      baseURL: APP_HOST,
      extraHTTPHeaders: {
        'x-api-key': X_API_KEY,
      },
    });

    const deleteUrl = `/api/v1/claims/${claimId}?agent_email=${AGENT_EMAIL}&agent_token=${AGENT_TOKEN}`;
    const response = await apiContext.delete(deleteUrl);
    expect(response.status()).toBe(200);
  }
  return { createClaim, deleteClaim };
}
