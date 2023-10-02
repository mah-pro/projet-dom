// Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closCart = document.querySelector('#clos-cart')
//open cart 
cartIcon.onclick = () =>{
    cart.classList.add('active') 
}
// close cart 
closCart.onclick = () =>{
    cart.classList.remove('active') 
}
//cart working Js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
//making function 
function ready(){
    //remove items from cart
    var remocecartButtons = document.getElementsByClassName('cart-remove')
    console.log(remocecartButtons)
    for (var i = 0; i < remocecartButtons.length; i++){
        var button = remocecartButtons[i]
        button.addEventListener('click', removecartitems)
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantitychanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartclicked);
    }
    //buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buybuttonclicked);
}
// buy button
function buybuttonclicked(){
    alert("Your order is placed")
    var cartcontent = document.getElementsByClassName('cart-content')[0]
    while (cartcontent.hasChildNodes()){
        cartcontent.removeChild(cartcontent.firstChild);
    }
    updatetotal();
}
    //remove items from cart
function removecartitems(event){
    var buttonclicked = event.target 
    buttonclicked.parentElement.remove()
    updatetotal();
}
// quantity changes
function quantitychanged(event){
    var input = event.target
    if(isNaN(input.value)|| input.value <= 0){
        input.value = 1
    }
    updatetotal();
}
// like button 
const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(button => {
    let liked = false;

    button.addEventListener('click', () => {
        liked = !liked;
        if (liked) {
            button.classList.add('liked');
            alert('Liked aerticle')
        } else {
            button.classList.remove('liked');
        }
    });
});



// add to cart
function addCartclicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addproductToCart(title, price, productImg);
    updatetotal();
}
function addproductToCart(title, price, productImg){
    var cartShopbox = document.createElement('div');
    cartShopbox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
        
    }
    var cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!-- Remove cart -->
<i class='bx bx-trash cart-remove'></i>`;
cartShopbox.innerHTML = cartBoxContent
cartItems.append(cartShopbox)
cartShopbox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removecartitems);
cartShopbox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantitychanged);
}



// Updata Total
function updatetotal(){
    var cartcontent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartcontent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartboxe = cartBoxes[i]
        var priceElement = cartboxe.getElementsByClassName('cart-price')[0]
        var quantityElement = cartboxe.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity);
    }
        //if price content some cents value
        total = Math.round(total * 100) / 100; 

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}
