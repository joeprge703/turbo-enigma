import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { getProduct } from "../data/products.js";
import { addToCart } from "../data/cart.js";

// console.log(`OrdersBefore`);
// console.log(orders);
// console.log('---');
/*
1 create order header html separatly from products HTML
  1.1 loop trough order's products and create seperate product info for each product in the order 
2 combine them into one bigger OrderHTML


BIG problem: so it looks like i cannot understand a single line here. idk mb i can, i sorta starting to, but it would be usefull to go a little bit back
*/



function updatelittlebitch () {document.querySelector('.cart-quantity').innerHTML = `${cart.cartItems.length}`
}




async function loadOrdersPage() {
  await loadProductsFetch()
  let ordersHTML = ''
  // console.log(orders.products[0].productId);
  orders.productId
  // le problemo. itdoesnt seem to notice its own products of the orders object. which is absolutely dogshit
  // maybe save cart items at the time of making an order so we can actually capture what products have been added to the order. This is so weird actually.
  // Oh and another thing im very grateful to you for continuing on this. it makes me more powerful, strong, and wise. I just started to notice how im starting to enjoying it. I dont feel so lazy doing that. Its not that much uncomfortable to do now, because of you expanding our comfort zone. See what im saying? Go on champ. Remember to come back


  
  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    
    ordersHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$35.06</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsListHTML(order)}
          </div>
        </div>
        `
  });

function productsListHTML(order) {
  let productsListHTML = ''
  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId)
    

    productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
            }
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          
          <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
        `
  })
  return productsListHTML
}

document.querySelector('.js-orders-grid').innerHTML += ordersHTML

// document.querySelectorAll('.js-buy-again-button')
//   .addEventListener('click', (productId) => {
//     cart.addToCart(productId)
//   })
  
const buyAgainButtons = document.querySelectorAll('.buy-again-button')
buyAgainButtons.forEach((button) => {
  button.addEventListener('click', () => {
    
    // cart.addToCart(button.dataset.productId)
    cart.addToCart(button.dataset.productId)
    console.log(cart);
    updatelittlebitch()
    loadOrdersPage()
  })
})

}



// console.log(orders);
// console.log(typeof orders);

console.log(cart.cartItems);

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}


export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}




updatelittlebitch()
loadOrdersPage()


/*
<div class="orders-grid">
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$35.06</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: 1
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            <div class="product-image-container">
              <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Adults Plain Cotton T-Shirt - 2 Pack
              </div>
              <div class="product-delivery-date">
                Arriving on: August 19
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>

        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>June 10</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$41.90</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="images/products/intermediate-composite-basketball.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Intermediate Size Basketball
              </div>
              <div class="product-delivery-date">
                Arriving on: June 17
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
*/