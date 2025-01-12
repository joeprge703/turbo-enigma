import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import { Car } from "../data/car.js";
// import '../data/backend-practice.js'
// import '../data/cart-class.js'


async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])
      renderOrderSummary()
      renderPaymentSummary()
      renderCheckoutHeader()

  } 
  catch (error) {
      // that didnt work :(
      console.log(error);
      window.close()
      console.log('UNEXPECTED ERROR> PLEASE KYS');
  }

}


loadPage()




// Promise.all([
//   loadProductsFetch(), 
//   new Promise((resolve, reject) => {
//     loadCart(() => {
//       resolve()
     
//     })
//   })
// ]).then((values) => {
//   renderOrderSummary()
//   console.log(values)
//   renderPaymentSummary()
//   renderCheckoutHeader()
// })

// new Promise((resolve) => {
//   loadProducts(() => {
//       resolve('resolve1')
//   })

// }).then((value) => {
//   console.log(value);
//   return new Promise((resolve, reject) => {
//     loadCart(() => {
//       resolve()
     
//     })
//   })

// }).then(() => {
//   renderOrderSummary()
//   renderPaymentSummary()
//   renderCheckoutHeader()
// })



// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
//     renderCheckoutHeader()
//   })
    
// })



function MaintainingTheValue() {
    if (me === 'fucked up') {
        me.thoughts = me.accomplishemnts. me.ideasToFixMyself, me.MovingForward
    }
}


// 15:06:14