let cartText;
let cart_container;
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

let size=document.getElementById("drinksize");
size.addEventListener('change', sizeChanged);

let addToCartBtn=document.getElementsByClassName("add-to-cart");

//Class for shopping item
function Item(name,quantity,size,price,flavor,purchase_type,delivery_period){
    this.name=name;
    this.quantity=quantity;
    this.size=size;
    this.price=price;
    this.flavor=flavor;
    this.purchase_type=purchase_type;
    this.delivery_period=delivery_period;
    this.html=`                  
    <div class="cart-box">
        <img src="${item_img}" alt="Mixed berries pack" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${this.name}</div>
            <div class="cart-flavor">${this.flavor}</div>
            <div class="cart-product-size">${this.size}</div>
            <div class="cart-price">${this.price}</div>
            <div class="cart-quantity-wrapper">
                <input type="number" value="1" min="0" class="cart-quantity">
                <h3 class="cart-remove" style="color:#828282;"><u style="cursor:pointer;">Remove</u></h3>
            </div>
        </div>
        
    </div>
    <div class="cart-subs">
        <div class="cart-subs-box">
            <h2 class="cart-title">${this.purchase_type}</h2>
            
        </div>
        <div class="cart-subs-box">
            <h3 class="cart-subs-title">Deliver every ${this.delivery_period}</h3>
        </div>
    </div>
    
    `
}

//load previous items from cart
//retrieve cart from local storage
let cart_history=JSON.parse(localStorage.getItem("cart"));
function onload(){
    cartText=document.getElementById("cart-popup");
    cart_container = document.getElementById("cart-container");
    
    one_toggle_btn = document.getElementById("btn-onetime");
    subscribe_toggle_btn = document.getElementById("btn-subscribe");


    cartItems=document.getElementsByClassName('cart-content')[0];
    cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
    //call this function to loop through the cart array to add to the cart container
    add_previous_items();
}

function add_previous_items(){
    if (cart_history.length==0){
        cartShopBox.innerHTML='';
        cartItems.append(cartShopBox);
    }
    for(var i=0;i<cart_history.length;i++){
        let item=cart_history[i]
        let cartBoxContent=item.html;
        cartShopBox.innerHTML=cartBoxContent;
        cartItems.append(cartShopBox);
    }
}

window.onclick=function(event){
    //get style of cart to check if it is clicking outside of it
    if(event.target.innerHTML=="Remove"){
        return;
    }
    if(typeof event.target!="undefined"){
        if(event.target.matches("#cart-popup")){
            showCart()
        }else{
            if(!cart_container.contains(event.target)){
                cart_container.style.right="-100%";
            }
        }
    }
}

//show cart from the right
function showCart(){
    cart_container.style.right="0px";
    ready();
}

function subscribe_selected(){
    subscribe_toggle_btn.style.borderColor="#9EC170";
    subscribe_toggle_btn.style.color="#9EC170";
    subscribe_toggle_btn.style.borderWidth="2px";
}

//get item's information and call addItemToCart function
function add_to_cart(){
    item_name=document.getElementById("item-name").innerHTML;
    item_price=document.getElementById("item-price").innerHTML;
    item_img=document.getElementById("drink-photo").src;
    item_size=document.getElementById("drinksize");
    item_delivery=document.getElementById("delivery-period");
    item_flavor=document.getElementById("flavor-indicator").innerHTML;
    addItemToCart(item_name,item_price,item_img_src,item_flavor);
    return false;
}

let cart=[];
//add item to cart
function addItemToCart(item_name,item_price,item_img_src,item_flavor){
    purchase_type=document.getElementsByClassName("button-purchase")[0].children;
    if (purchase_type[0].checked){
        item_purchase_type=purchase_type[0].value;
    }
    if (purchase_type[2].checked){
        item_purchase_type=purchase_type[2].value;
    }
    //creating item as object
    let item=new Item(item_name,1,item_size.value,item_price,item_flavor,item_purchase_type,item_delivery.value);
    //push it to existing cart
    cart.push(item);
    var cartBoxContent=item.html;
    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
    //save cart array to local storage
    localStorage.setItem("cart",JSON.stringify(cart));
}


function ready(){
    //remove item from cart
    let removeButton=document.getElementsByClassName("cart-remove");  
    for(var i=0;i<removeButton.length;i++){
        let button=removeButton[i];
        button.addEventListener('click', removeItem);
    }
    updatetotal();
    let quantityInputs=document.getElementsByClassName("cart-quantity");
    for (var i=0; i<quantityInputs.length; i++){
        let input=quantityInputs[i];
        input.addEventListener("change",quantityChanged)
    }
}

function sizeChanged(){
    if(size.options[size.selectedIndex].text=="Large bottle(16oz)"){
        document.getElementById("item-price").innerHTML="$20";
    }else{
        document.getElementById("item-price").innerHTML="$12";
    }
}

//when quantity is changed, update total
function quantityChanged(){
    updatetotal();
}

//remove item
function removeItem(event){
    let buttonClicked=event.target;
    //remove from cart array
    cart_history.pop();
    //update cart in local storage
    localStorage.setItem("cart",JSON.stringify(cart_history))
    //update appearance of cart
    add_previous_items();
    updatetotal();
}

//update total price when an item is removed
function updatetotal(){
    let cartBox=document.getElementsByClassName("cart-box")[0];
    if(typeof cartBox=="undefined"){
        document.getElementsByClassName("total-price")[0].innerHTML="$0";
        return;
    }
    let total=0;
    let itemPrice=cartBox.getElementsByClassName("cart-price")[0];
    let itemQuantity=cartBox.getElementsByClassName("cart-quantity")[0].value;
    let price=parseFloat(itemPrice.innerText.replace("$",""));
    total=total+itemQuantity*price;
    document.getElementsByClassName("total-price")[0].innerHTML="$"+total;
}

//pop up when check out button is clicked
function checkout(){
    if(document.getElementsByClassName("total-price")[0].innerHTML=="$0"){
        alert("You have nothing to check out!")
    }else{
        alert("Your order is placed");
    }
}

//toggle flavor when user selects a different flavor
function changeFlavorIcon(clickedElement){
    src=clickedElement.getAttribute('src');
    //if user select flavor2
    if(src=="flavor2.png"){
        document.getElementById("flavor-indicator").innerHTML="Mixed vegatables"
        flavor1=document.getElementsByClassName("flavor-icon")[0];
        flavor3=document.getElementsByClassName("flavor-icon")[2];
        if (flavor1.getAttribute('src')=="flavor1-border.png"){
            flavor1.src="flavor1.png";
            clickedElement.src="flavor2-border.png";
        }
        else if (flavor3.getAttribute('src')=="flavor3-border.png"){
            flavor3.src="flavor3.png";
            clickedElement.src="flavor2-border.png";
        }
        else{
            return;
        }
    }
    //if user select flavor1
    if(src=="flavor1.png"){
        document.getElementById("flavor-indicator").innerHTML="Chocolate"
        flavor2=document.getElementsByClassName("flavor-icon")[1];
        flavor3=document.getElementsByClassName("flavor-icon")[2];
        if (flavor2.getAttribute('src')=="flavor2-border.png"){
            flavor2.src="flavor2.png";
            clickedElement.src="flavor1-border.png";
        }
        else if (flavor3.getAttribute('src')=="flavor3-border.png"){
            flavor3.src="flavor3.png";
            clickedElement.src="flavor1-border.png";
        }
        else{
            return;
        }
    }
    //if user select flavor3
    if(src=="flavor3.png"){
        document.getElementById("flavor-indicator").innerHTML="Mixed Berries"
        flavor1=document.getElementsByClassName("flavor-icon")[0];
        flavor2=document.getElementsByClassName("flavor-icon")[1];
        if (flavor1.getAttribute('src')=="flavor1-border.png"){
            flavor1.src="flavor1.png";
            clickedElement.src="flavor3-border.png";
        }
        else if (flavor2.getAttribute('src')=="flavor2-border.png"){
            flavor2.src="flavor2.png";
            clickedElement.src="flavor3-border.png";
        }
        else{
            return;
        }
    }
}