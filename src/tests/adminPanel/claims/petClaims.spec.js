import { test, expect } from "../../setupPage";
require("dotenv").config();

test("Create a new claim and delete it", async ({ customerPage }) => {
  await customerPage.createClaim();
  await customerPage.deleteClaim()
});