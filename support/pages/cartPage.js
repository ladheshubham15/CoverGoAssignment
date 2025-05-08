class CartPage {
    constructor(page) {
      this.page = page
    }
  
    async clickCheckout() {
      await this.page.click('[data-test="checkout"]')
    }
  }
export default CartPage
  