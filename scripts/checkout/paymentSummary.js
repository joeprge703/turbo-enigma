import { cart } from "../../data/cart-class.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder, orders } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency} from '../utils/hessofuckingdumbidontgetit(money.js).js'

// BEWARE, MY FRIEND. TIS BICH UP THERE 
// MESSES UP WITH UR FILEPATH

function updateCartCheckout() {

  let cartQuantity = 0
  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  })
  return cartQuantity
}




export function renderPaymentSummary() {
    let productPriceCents = 0 
    let shipingPriceCents = 0
    

    cart.cartItems.forEach(cartItem => {
        const product = getProduct(cartItem.productId)
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shipingPriceCents += deliveryOption.priceCents
        
    });


    // console.log(productPriceCents)
    // console.log(shipingPriceCents)
    
    const totalBeforeTaxCents = productPriceCents + shipingPriceCents
    // console.log(totalBeforeTaxCents)
    const taxCents = totalBeforeTaxCents * 0.1
    const totalCents = totalBeforeTaxCents + taxCents

    const paymentSummaryHTML = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartCheckout()}):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shipingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
             </button>
    `


    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML

    document.querySelector('.js-place-order')
      .addEventListener('click', async () => {
        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart: cart.cartItems
            })
            
          })
  
          const order = await response.json()
          console.log(order);
          addOrder(order)
          console.log(orders);
        } catch(error) {
          console.log('jsdfasdlfkjsadfklj');
        }
      window.location.href = 'orders.html'
      })
}