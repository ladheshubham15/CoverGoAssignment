// tests/checkout.spec.js
import { test, expect } from '@playwright/test'
import LoginPage from '../support/pages/loginPage'
import CartPage from '../support/pages/cartPage'
import InventoryPage from '../support/pages/inventoryPage'
import CommonUIHelper from '../support/Utils/commonUIHelper'

test.describe('Verifying Checkout page functionality', () => {

  let login, inventory, cart, utils

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page)
    inventory = new InventoryPage(page)
    cart = new CartPage(page)
    utils = new CommonUIHelper(page)
    await login.goto()
    await login.login(process.env.VALID_USER, process.env.VALID_PASS)
  })
  
  test('Verify error shown when checkout info is incomplete', async ({ page }) => {
    await inventory.addItemToCart('sauce-labs-backpack')
    await inventory.openCart()
    await cart.clickCheckout()
    await page.click('[data-test="continue"]')
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await utils.verifyErrorMessage('First Name is required')
  })

  test('Complete checkout with valid info', async ({ page }) => {
    await inventory.addItemToCart('sauce-labs-backpack')
    await inventory.openCart()
    await cart.clickCheckout()
    await page.fill('[data-test="firstName"]', 'Shubham')
    await page.fill('[data-test="lastName"]', 'Ladhe')
    await page.fill('[data-test="postalCode"]', '12345')
    await page.click('[data-test="continue"]')
    await page.click('[data-test="finish"]')
    await expect(page.locator('.complete-header')).toContainText('Thank you')
  })
})
