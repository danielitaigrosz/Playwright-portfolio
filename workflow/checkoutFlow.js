// workflows/CheckoutFlow.js
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

/**
 * Workflow que combina ações de várias páginas (Login + Inventory + Checkout)
 * em um único passo reutilizável, evitando repetição nos arquivos de teste.
 */
class CheckoutFlow {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  /**
   * Faz login, adiciona um produto ao carrinho e inicia o checkout.
   */
  async comprarProduto(usuario, senha, nomeProduto) {
    await this.loginPage.goto();
    await this.loginPage.login(usuario, senha);
    await this.inventoryPage.addProductToCartByName(nomeProduto);
    await this.inventoryPage.goToCart();
    await this.checkoutPage.startCheckout();
  }
}

module.exports = { CheckoutFlow };