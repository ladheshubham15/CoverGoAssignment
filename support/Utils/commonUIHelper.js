import { expect } from "@playwright/test"
class CommonUIHelper {
    constructor(page) {
      this.page = page
    }
  
    async verifyErrorMessage(errorMessage) {
      await expect(this.page.locator('[data-test="error"]')).toContainText(errorMessage)
    }
  }
export default CommonUIHelper
  