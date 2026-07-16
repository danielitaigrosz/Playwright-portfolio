// pages/InventoryPage.js

/**
 * Page Object referente à tela de listagem de produtos (Inventory)
 * exibida após o login com sucesso no SauceDemo.
 */
class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    
    //criando logout
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async isLoaded() {
    return this.pageTitle.isVisible();
  }

  async getItemsCount() {
    return this.inventoryItems.count();
  }

  async addProductToCartByName(productName) {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartItemsCount() {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  //criando método para logout
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
