class InventoryPage {
    constructor(page) {
      this.page = page
    }
  
    async addItemToCart(itemName) {
      await this.page.click(`button[data-test="add-to-cart-${itemName}"]`)
    }
  
    async removeItemFromCart(itemName) {
      await this.page.click(`button[data-test="remove-${itemName}"]`)
    }
  
    async openCart() {
      await this.page.click('.shopping_cart_link')
    }
  }
  export default InventoryPage
  