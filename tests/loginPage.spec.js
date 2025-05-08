import { test, expect } from '@playwright/test'
import LoginPage from '../support/pages/loginPage'
import CommonUIHelper from '../support/Utils/commonUIHelper'
import { credentials } from '../support/Utils/testData'

test.describe('Verification of Login Page Functionality', () => {

  let login, utils
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page)
    utils = new CommonUIHelper(page)
    await login.goto()
  })

  test('Valid login', async ({ page }) => {
    await login.login(credentials.validUser.username, credentials.validUser.password)
    await expect(page).toHaveURL(/inventory/)
  })

  test('Invalid login - wrong password', async ({ page }) => {
    await login.login(credentials.invalidUser.username, credentials.invalidUser.password)
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await utils.verifyErrorMessage('Username and password do not match any user in this service')
  })

  test('Invalid login - locked out user', async ({ page }) => {
    await login.login(credentials.lockedOutUser.username, credentials.lockedOutUser.password)
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await utils.verifyErrorMessage('Sorry, this user has been locked out')
  })

  test('Logout from app', async ({page}) => {
    await login.login(credentials.validUser.username, credentials.validUser.password)
    await expect(page).toHaveURL(/inventory/)
    await page.click('#react-burger-menu-btn')
    await page.click('#logout_sidebar_link')
    await expect(page).toHaveURL(/saucedemo/)
  })

})
