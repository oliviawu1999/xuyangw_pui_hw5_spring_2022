let hiddenDiv=document.getElementsByClassName("cards");
let hiddenBtn=document.getElementsByClassName("quick-add-btn");
let cartShopBox=document.createElement('div');
let cart_container = document.getElementById("cart-container");

for(var i = 0; i<hiddenDiv.length; i++){
    let input=hiddenDiv[i];
    input.addEventListener('mouseover', showBtn);
    hiddenDiv[i].addEventListener('mouseout', hideBtn)
}

//control hover effects for "Quick view button"
function showBtn(){
    btn=this.getElementsByClassName("quick-add-btn")[0]
    btn.style.visibility="visible";
    btn.style.opacity="1";
}

function hideBtn(){
    btn=this.getElementsByClassName("quick-add-btn")[0]
    btn.style.visibility="hidden";
    btn.style.opacity="0";
}

function showCart(){
    cart_container.style.right="0px";
    onload()
    ready();
}

//pop up when check out button is clicked
function checkout(){
    if(document.getElementsByClassName("total-price")[0].innerHTML=="$0"){
        alert("You have nothing to check out!")
    }else{
        alert("Your order is placed");
    }
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

//load previous items from cart
//retrieve cart from local storage
let cart_history=JSON.parse(localStorage.getItem("cart"));
function onload(){
    
    cartText=document.getElementById("cart-popup");
    
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