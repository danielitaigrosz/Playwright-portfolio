// tests/logout.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../utils/users');

test('deve deslogar com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Faz login primeiro
  await loginPage.goto();
  await loginPage.login(users.standardUser.username, users.standardUser.password);

  // Faz logout
  await inventoryPage.logout();

  // Confere se voltou pra tela de login
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});