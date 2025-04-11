import { test as base } from "@playwright/test";
import { CustomerPage, ClaimDocument } from "../pageObjects";

export const test = base.extend({
  customerPage: async ({ page }, use) => {
    await use(new CustomerPage(page));
  },
  claimDocument: async ({ page }, use) => {
    await use(new ClaimDocument(page));
  }
  
});

export { expect } from "@playwright/test";
