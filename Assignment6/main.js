// Cart

/*
let cartText = document.querySelector("#cart-popup");
let cart = document.querySelector(".cart");

cartText.onclick=function(){
    console.log("hi");
    cart.classList.add("active");
}
*/

let cartText;
let cart;
let one_toggle_btn;
let subscribe_toggle_btn;

let item_name;
let item_price;
let item_img;
let cartItems;
let cartItemsNames;
let cartShopBox=document.createElement('div');
let item_img_src;

let item_size;
let item_delivery;

function onload(){
    cartText=document.getElementById("cart-popup");
    cart = document.getElementById("cart-container");
    one_toggle_btn = document.getElementById("btn-onetime");
    subscribe_toggle_btn = document.getElementById("btn-subscribe");


    cartItems=document.getElementsByClassName('cart-content')[0];
    cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
}

function showCart(){
    cart.style.right="0";
    console.log(document.getElementsByClassName('selectdiv')[0]);
}

function subscribe_selected(){
    subscribe_toggle_btn.style.borderColor="#9EC170";
    subscribe_toggle_btn.style.color="#9EC170";
    subscribe_toggle_btn.style.borderWidth="2px";
}

function add_to_cart(){
    item_name=document.getElementById("item-name").innerHTML;
    item_price=document.getElementById("item-price").innerHTML;
    item_img=document.getElementById("drink-photo").src;
    item_size=document.getElementById("drinksize");
    item_delivery=document.getElementById("delivery-period");
   
    console.log(item_delivery.value);
    addItemToCart(item_name,item_price,item_img_src);
}



function addItemToCart(item_name,item_price,item_img_src){
    cartShopBox.classList.add('cart-outer');

    var cartBoxContent=`
                        <div class="cart-box">
                            <img src="${item_img}" alt="Mixed berries pack" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${item_name}</div>
                                <div class="cart-product-size">${item_size.value}</div>
                                <div class="cart-price">${item_price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                        </div>
                        <div class="cart-subs">
                            <div class="cart-subs-box">
                                <h2 class="cart-title">Subscription</h2>
                                <h3 style="color:#828282;"><u style="cursor:pointer;">Remove</u></h3>
                            </div>
                            <div class="cart-subs-box">
                                <h3 class="cart-subs-title">${item_delivery.value}</h3>
                                <h3 style="color:#828282;"><u style="cursor:pointer;">Edit</u></h3>
                            </div>
                        </div>
                        <i class='cart-remove' ></i>`;
    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);

    
}



