// workflow/LoginFlow.js
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

/**
 * Workflow que combina o login com a confirmação de que o usuário chegou corretamente na tela de produtos.
 */
class LoginFlow {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
  }

  /**
   * Faz login e já garante que a tela de inventário carregou.
   */
  async logarComoUsuarioValido(usuario, senha) {
    await this.loginPage.goto();
    await this.loginPage.login(usuario, senha);
    await this.inventoryPage.isLoaded();
  }
}

module.exports = { LoginFlow };