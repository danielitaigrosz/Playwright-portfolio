// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../utils/users');

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('deve logar com sucesso usando um usuário válido', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(users.standardUser.username, users.standardUser.password);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(await inventoryPage.isLoaded()).toBeTruthy();
  });

  test('não deve logar com credenciais inválidas', async () => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });

  test('não deve permitir login de usuário bloqueado', async () => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('locked out');
  });

  test('deve exibir erro ao tentar logar sem preencher os campos', async () => {
    await loginPage.loginButton.click();

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username is required');
  });
});
