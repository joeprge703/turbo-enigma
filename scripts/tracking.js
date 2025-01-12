import { getProduct } from "../data/products.js"
import { getOrder } from "./order.js";
import { loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { cart } from "../data/cart-class.js";
// let productInfo = url.searchParams.get('productId') + url.searchParams.get('orderId')

async function loadTrackingPage(cart) {
  await loadProductsFetch()
  const url = new URL(window.location.href); // Make sure to define the URL object
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const order = getOrder(orderId)
  const product = getProduct(productId)
  console.log(orderId)
  console.log(url.searchParams.get('productId'))
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });
  console.log(productDetails);
  console.log(orderId);
  console.log(productId);

  
  const TrackingPageHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

      <div class="delivery-date">
          Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }</div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
         Quantity: ${productDetails.quantity}
        </div>  

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          
   
        
        
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container" >
          <div class="progress-bar" style="width: ${calculateProgressDate(productDetails, order)}%"></div>
        </div>
  `
  document.querySelector('.js-order-tracking').innerHTML = TrackingPageHTML
  console.log(order);
  function calculateProgressDate(productDetails, order) {
    let currentTime = Number(dayjs().format('D'))
    let deliveryTime = Number(dayjs(productDetails.estimatedDeliveryTime).format('D'))
    let orderTime = Number(dayjs(order.orderTime).format('D'))
    let number = ((currentTime - orderTime) / (deliveryTime - orderTime) * 100)
    
    let timeTillArrival = deliveryTime - currentTime

    
    // it might be better to use your own calculation, as it is weird to use dates and not actual days
    console.log(timeTillArrival);
    console.log('Calculation should be percents?');
    console.log(number);

    let daysToWait = 0
    // for (let i = 0; i < array.length; i++) {
    //   const element = array[index];
      
    // }
    console.log(currentTime);
    console.log(deliveryTime);
    console.log(orderTime);
    


    return number
  }
  calculateProgressDate(productDetails, order)


  function statusThing(productDetails,order) {
    let number = calculateProgressDate(productDetails, order)
    
    
    const stages = document.querySelectorAll('.progress-label')
    if (number <= 49) {
      stages[0].classList.add("current-status")
    }  
    if (number >= 50 && number <= 99) {
      stages[1].classList.add("current-status")
    } 
    if (number >= 100) {
      stages[2].classList.add("current-status")
    }
    
  }

  document.querySelector('.cart-quantity')
    .innerHTML = 

  // function bravoSixStatus(number) {
  //   if (number > 49) {

  //   }
  // }


  statusThing(productDetails,order)
}



loadTrackingPage()

