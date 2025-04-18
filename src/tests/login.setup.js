import { test as setup } from '@playwright/test';
import { loginWithGoogle } from '../pageObjects/loginPage';
import 'dotenv/config';

const AGENT_EMAIL = process.env.AGENT_EMAIL;
const AGENT_PASSWORD = process.env.AGENT_PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;
const authFile = 'playwright/.auth/user.json';

setup('authenticate by UI', async ({ page }) => {
  await loginWithGoogle(page, AGENT_EMAIL, AGENT_PASSWORD, SECRET_KEY);
  await page.context().storageState({ path: authFile });
});
