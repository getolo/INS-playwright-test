import { expect } from '@playwright/test';
import path from 'path';

export async function fillClaimDocument(
  page,
  treatmentAmount,
  payoutAmount,
  treatmentCategory,
  attachmentPath = null
) {
  const newClaimDocumentButton = page.getByRole('link', {
    name: 'Neues Behandlungsdokument',
  });
  const attachmentInput = page.locator('[name="file[]"]');
  const dateInput = page.getByPlaceholder('Erstellungsdatum des');
  const amountInput = page.getByPlaceholder('GOT Honorar ');
  const categorySelect = page.locator('#treatment_category');
  const addTreatmentButton = page.locator('#add-treatment');
  const selectTreatmentDropdown = page
    .locator('div')
    .filter({ hasText: /^Select\.\.\.$/ })
    .nth(2);
  const treatmentOption = page.locator('#react-select-2-option-1');
  const netAmountInput = page.getByPlaceholder('Nettobetrag');
  const submitButton = page.getByRole('button', { name: 'strg+enter Fertig' });
  const saveButton = page.getByRole('button', { name: 'Speichern' });

  await newClaimDocumentButton.click();

  if (attachmentPath) {
    await attachmentInput.click();
    await page.setInputFiles(attachmentInput, path.resolve(__dirname, attachmentPath));
  }

  await page.getByLabel('Rechnung').check();
  await expect(page.getByLabel('Rechnung')).toBeVisible();

  await dateInput.click();
  await page.getByRole('button', { name: 'Today' }).click();

  await amountInput.dblclick();
  await amountInput.fill(treatmentAmount);

  await categorySelect.selectOption(treatmentCategory);

  await addTreatmentButton.click();
  await selectTreatmentDropdown.click();
  await treatmentOption.click();

  await netAmountInput.click();
  await netAmountInput.fill(payoutAmount);

  await submitButton.click();
  await expect(saveButton).toBeVisible();

  await saveButton.click();
  await page.waitForTimeout(1500);
}
