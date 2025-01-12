import { cart } from "../data/cart-class.js"
import { products, loadProducts, loadProductsFetch } from "../data/products.js"
import { formatCurrency } from "./utils/hessofuckingdumbidontgetit(money.js).js"
// window.location.href = 'amazon.html'



loadProducts(renderProductsGrid)
function renderProductsGrid() {
  console.log(products);
  let modifiedProducts = ''
  document.querySelector('.search-button')
    .addEventListener('click', (modifiedProducts) => {
      const request = document.querySelector('.search-bar').value 
      window.location.href = `amazon.html?search=${request}`
      const url = new URL(window.location.href)
      const URLrequest = url.searchParams.get('search')
      console.log(URLrequest);
      // SearchFeature(URLrequest)
      renderProductsGrid()
    })
  
  
  let productsHTML = ''
  // it probobly would work out with URL search logic rather than searching for an array that is yet to exist 
  // it worked holy fuck 
  const mainUrl = new URL (window.location.href)
  const mainUrlRequest = mainUrl.searchParams.get('search') ? mainUrl.searchParams.get('search') : null
  console.log(mainUrlRequest);

  if (!mainUrlRequest) {
  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}
          
          

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-product-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
    
    
      
  })} else {
    const modifiedProducts = SearchFeature(mainUrlRequest)
    console.log(modifiedProducts);
    console.log(typeof modifiedProducts);
    modifiedProducts.forEach((product) => {
      productsHTML += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
            ${product.getPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHTML()}
            
            
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-product-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `
  })}

  let timeoutId1 = ''

  setInterval(() => {
    clearTimeout(timeoutId1)
  }, 3000)
  // 12:49:32 14-modules

  // it somehow stopped deleting previous timers. And its still behaving weird when adding multiple amounts of goods



  function updateCartQuantity() {
    let cartQuantity = 0
    cart.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    })
    
    document.querySelector('.cart-quantity')
      .innerHTML = `${cartQuantity}`
  }

  updateCartQuantity()



  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML





    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          
          const productId = button.dataset.productId
          
          cart.addToCart(productId)
          updateCartQuantity()

          let addedToCartDisplay = document.querySelector(`.js-added-product-${productId}`)
          addedToCartDisplay.classList.add('product-added')
          
          if (timeoutId1) {
            clearTimeout(timeoutId1)
          }


          timeoutId1 = setTimeout(() => {
            addedToCartDisplay.classList.remove('product-added');
        }, 2000);


        

          //   addedToCartDisplay.classList.add('product-added')
              
          //   if (timeoutId1 && !addedToCartDisplay.classList.contains('product-added')) {
          //     clearTimeout(timeoutId1)
          //   }

          //   timeoutId1 = setTimeout(() => {
          //     addedToCartDisplay.classList.remove('product-added');
          // }, 2000);


          // if (productId) {
          //   setInterval(() => {
          //     addedToCartDisplay.classList.remove('product-added')
          //   }, 2000)
          // }

          
          console.log(cart)
        })
      })

      function SearchFeature(request) {
        loadProductsFetch()
        const url = new URL(window.location.href)
        // console.log(request);
        // console.log('pisa');
        // console.log(url)

        console.log(products);
        const lowerCaseRequest = request.toLowerCase()

        // Version 1
        // let modifiedProducts = products.map((product) => {
        //   // const NewArray = [products]
        //   // console.log(NewArray);
        //   if (product.name.includes(request)) {
        //     console.log(product);
        //     return product
        //   } else {
        //     products.splice()
        //    }
        // })


        // Version AI
        let nameArray = products.filter((product) => {
          

          if (product.name.toLowerCase().includes(lowerCaseRequest) && JSON.stringify(product.keywords).toLowerCase().includes(lowerCaseRequest)) {
              console.log(product); // Log the product if it matches
              return true; // Keep this product in the new array
          } else {
            return false
          } 
          ; // Exclude this product from the new array
        }); 
        
        let keyWordsArray = products.filter((product) => {
          if (JSON.stringify(product.keywords).toLowerCase().includes(lowerCaseRequest)) {
              console.log(product); // Log the product if it matches
              return true; // Keep this product in the new array
          } else {
            return false
          }})

        const modifiedProductsArray = nameArray.contact(keyWordsArray)
        console.log('Modified Products:');
        console.log(modifiedProductsArray);
      
        // <a href="tracking.html?orderId=${order.id}&productId=${product.id}
        
        return modifiedProductsArray
      }
      
  }




 

  
// 15
// electric glass and steel
//   : 
//   Product
//   id: 
//   "c2a82c5e-aff4-435f-9975-517cfaba2ece"
//   image: 
//   "images/products/electric-glass-and-steel-hot-water-kettle.webp"
//   keywords: 
//   (3) ['water boiler', 'appliances', 'kitchen']

//   name:"Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter"
//   priceCents
//   : 
//   3074
//   rating
//   : 
//   {stars: 5, count: 846}
//   [[Prototype]]
//   : 
// Object