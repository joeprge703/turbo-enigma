import { cart } from "../../data/cart-class.js"
export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2)
}

export default formatCurrency


export function updateCartCheckout() {

    let cartQuantity = 0
    cart.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    })
    if (cartQuantity <= 1) {
      return `${cartQuantity} item`
    } else {
      return `${cartQuantity} items`
    }
    
  }