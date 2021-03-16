import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee , faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
   
    const {img , name , seller , price , stock} = props.product;
    return (
        <div className="product">
           
           <div>
                <img src={img} alt=""/>
           </div>
           <div>
                <h1 className="product-name">{name}</h1>
                <p>By : {seller}</p>
                <h3>${price}</h3>
                <p>Only <b>{stock}</b> left in stock - order soon.</p>
                <button 
                onClick={()=> props.addProduct(props.product)}
                className="add-cart-button"> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
           </div>
            
        </div>
    );
};

export default Product;