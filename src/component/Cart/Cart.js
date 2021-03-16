import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price ;    
    };

    let shipping = 0;
    if(total == 0){
        shipping = 0;
    }
    else if(total<30 && total>0) {
         shipping = 12.75;   
    }
    else if(total>30){
        shipping = 7.5; 
    }
    
    const tax = (total*6)/100;

    const formatNumber = (num) =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>           
            <h2>Ordered Summary</h2>
            <p>Items Ordered : {cart.length}</p>           
            <h3>Price : ${formatNumber(total)}</h3>
            <p>Shipping-Cost : ${shipping}</p>
            <p>Vat + Tax : ${formatNumber(tax)}</p>
            <h2>Total Cost : ${formatNumber(total + shipping + tax)}</h2>
        </div>
    );
};

export default Cart;