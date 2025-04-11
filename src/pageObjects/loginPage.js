const { expect } = require('@playwright/test');
const { authenticator } = require('otplib');

async function loginWithGoogle(page, email, password, secret) {
  await page.goto(`${process.env.BASE_URL}/sign_in`);
  await page.getByRole('button', { name: 'Sign in with Google' }).click();

  await page.locator('[id="identifierId"]').fill(email);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);

  await page.getByLabel('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);

  const otp = authenticator.generate(secret);
  await page.getByLabel('Enter code').fill(otp);
  await page.getByRole('button', { name: 'Next' }).click();

  await page.waitForTimeout(3500);
  await expect(page).toHaveURL('https://beta7.dentolo-test.de/admin');
}

module.exports = { loginWithGoogle };
