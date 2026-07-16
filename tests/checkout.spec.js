// tests/checkout.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const users = require('../utils/users');

test.describe('Fluxo de checkout', () => {
  test('deve concluir uma compra do início ao fim', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory.html/);

    // 2. Adiciona produto e vai para o carrinho
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    // 3. Inicia o checkout e preenche os dados
    await checkoutPage.startCheckout();
    await checkoutPage.fillPersonalInfo('João', 'Silva', '80000-000');

    // 4. Finaliza a compra
    await checkoutPage.finishCheckout();

    // 5. Valida a mensagem de sucesso
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).toBe('Thank you for your order!');
  });
});
