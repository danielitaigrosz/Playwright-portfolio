// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../utils/users');

test.describe('Carrinho de compras', () => {
  let inventoryPage;

  // Antes de cada teste, faz login com um usuário válido
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('deve adicionar um produto ao carrinho', async () => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');

    const cartCount = await inventoryPage.getCartItemsCount();
    expect(cartCount).toBe(1);
  });

  test('deve adicionar múltiplos produtos ao carrinho', async () => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');

    const cartCount = await inventoryPage.getCartItemsCount();
    expect(cartCount).toBe(3);
  });

  test('deve ordenar os produtos por preço (menor para maior)', async ({ page }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map((price) => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
  });
});
