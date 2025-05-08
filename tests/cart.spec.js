import { test, expect,page } from '@playwright/test'
import InventoryPage from '../support/pages/inventoryPage'
import LoginPage from '../support/pages/loginPage'
import CartPage from '../support/pages/cartPage'
import { credentials } from '../support/Utils/testData'


test.describe('Verifying Cart Functionality', () => {

  let login,inventory,cart , cartPageLoc


  test.beforeEach(async({page}) => {
    login = new LoginPage(page)
    inventory = new InventoryPage(page)
    cart = new CartPage(page)
    await login.goto()
    await login.login(credentials.validUser.username, credentials.validUser.password)
  })

  test('Add item to cart', async ({page}) => {
    await inventory.addItemToCart('sauce-labs-backpack')
    await inventory.openCart()
    await expect(page.locator('.cart_item')).toHaveCount(1)
  })

  test('Remove item from cart', async ({page}) => {
    await inventory.addItemToCart('sauce-labs-bike-light')
    await inventory.removeItemFromCart('sauce-labs-bike-light')
    await inventory.openCart()
    await expect(page.locator('.cart_item')).toHaveCount(0)
  })

  test('Continue shopping from cart', async ({page}) => {
    await inventory.addItemToCart('sauce-labs-backpack')
    await inventory.openCart()
    await page.click('[data-test="continue-shopping"]')
    await expect(page).toHaveURL(/inventory/)
  })

  test('Sort products by price - low to high', async ({page}) => {
    await page.selectOption('.product_sort_container', 'lohi')
    const prices = await page.$$eval('.inventory_item_price', items => items.map(el => parseFloat(el.textContent.replace('$', ''))))
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  test('Verify reset app state removes items from cart', async ({page}) => {
    await inventory.addItemToCart('sauce-labs-bike-light')
    await page.click('#react-burger-menu-btn')
    await page.click('#reset_sidebar_link')
    await inventory.openCart()
    await expect(page.locator('.cart_item')).toHaveCount(0)
  })

})
