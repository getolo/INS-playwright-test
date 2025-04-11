import { expect } from "@playwright/test";
class ClaimDocument {
  constructor(page) {
    this.page = page;
    this.newClaimDocumentButton = page.getByRole("link", {
      name: "Neues Behandlungsdokument",
    });
    this.attachmentInput = page.locator('[name="file[]"]');
    this.dateInput = page.getByPlaceholder("Erstellungsdatum des");
    this.amountInput = page.getByPlaceholder("GOT Honorar ");
    this.categorySelect = page.locator("#treatment_category");
    this.addTreatmentButton = page.locator("#add-treatment");
    this.selectTreatmentDropdown = page
      .locator("div")
      .filter({ hasText: /^Select\.\.\.$/ })
      .nth(2);
    this.treatmentOption = page.locator("#react-select-2-option-1");
    this.netAmountInput = page.getByPlaceholder("Nettobetrag");
    this.submitButton = page.getByRole("button", {
      name: "strg+enter Fertig",
    });
    this.saveButton = page.getByRole("button", { name: "Speichern" });
  }

  async fillClaimDocument(
    treatmentAmount,
    payoutAmount,
    treatmentCategory,
    attachmentPath = null
  ) {
    await this.newClaimDocumentButton.click();
    if (attachmentPath) {
      await this.attachmentInput.click();
      await this.page.setInputFiles(
        this.attachmentInput,
        path.resolve(__dirname, attachmentPath)
      );
    }
    await this.page.getByLabel("Rechnung").check();
    await expect(this.page.getByLabel("Rechnung")).toBeVisible();
    await this.dateInput.click();
    await this.page.getByRole("button", { name: "Today" }).click();
    await this.amountInput.dblclick();
    await this.amountInput.fill(treatmentAmount);
    await this.categorySelect.selectOption(treatmentCategory);
    await this.addTreatmentButton.click();
    await this.selectTreatmentDropdown.click();
    await this.treatmentOption.click();
    await this.netAmountInput.click();
    await this.netAmountInput.fill(payoutAmount);
    await this.submitButton.click();
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
    await this.page.waitForTimeout(1500);
  }
}
export default ClaimDocument;
