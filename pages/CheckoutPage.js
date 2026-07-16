// pages/CheckoutPage.js

/**
 * Page Object referente ao fluxo de checkout (carrinho -> dados -> resumo -> finalização).
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Carrinho
    this.checkoutButton = page.locator('[data-test="checkout"]');

    // Etapa 1: informações pessoais
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    // Etapa 2: resumo
    this.finishButton = page.locator('[data-test="finish"]');

    // Etapa 3: confirmação
    this.successMessage = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillPersonalInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getSuccessMessage() {
    return this.successMessage.textContent();
  }
}

module.exports = { CheckoutPage };
