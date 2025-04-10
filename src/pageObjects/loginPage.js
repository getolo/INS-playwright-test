const { expect } = require("@playwright/test");
const { authenticator } = require("otplib");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async loginWithGoogle(email, password, secret) {
    await this.page.goto(`${process.env.BASE_URL}/sign_in`);
    await this.page
      .getByRole("button", { name: "Sign in with Google" })
      .click();

    await this.page.locator('[id="identifierId"]').fill(email);
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.waitForTimeout(2000);

    await this.page.getByLabel("Enter your password").fill(password);
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.waitForTimeout(2000);

    const otp = authenticator.generate(secret);
    await this.page.getByLabel("Enter code").fill(otp);
    await this.page.getByRole("button", { name: "Next" }).click();

    await this.page.waitForTimeout(3500);
    await expect(this.page).toHaveURL("https://beta7.dentolo-test.de/admin");
  }
}

module.exports = { LoginPage };
