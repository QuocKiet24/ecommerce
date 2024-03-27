let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx.x');
    navlist.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx.x');
    navlist.classList.remove('open');
}


// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart-sidebar');
let closeCart = document.querySelector('#close-cart');
// open cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
};
// close cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
};

//Cart working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready();
}

//Makeing Function
function ready(){
    //Remove Item
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i =0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i =0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //add to cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)}

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// quantity changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value)|| input.value <=0){
        input.value = 1;
    }
    updatetotal();
}

//add to cart

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addProductToCart(title, price, imageSrc);
    console.log(title)
    updatetotal();
    
}

function addProductToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return;
        }
    }
    var cartBoxContents = `
            <img src="${imageSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- remove cart -->
            <i class="ri-close-circle-fill cart-remove"></i>
        </div>`
    cartRow.innerHTML = cartBoxContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}


// Update total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i =0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("₫",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        total = Math.round(total * 100 / 100);
        document.getElementsByClassName('total-price')[0].innerText = total + "₫";
    }
}