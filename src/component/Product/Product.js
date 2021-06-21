import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const Product = (props) => {
   
    const {img , name , seller , price , stock , key} = props.product;
   
    return (
        <div className="product">
           
           <div>
                <img src={img} alt=""/>
           </div>
           <div>
                <h1 className="product-name"> <Link style={{textDecoration:'none'}} to={"/product/"+key}>{name}</Link> </h1>
                <p>By : {seller}</p>
                <h3>${price}</h3>
                <p>Only <b>{stock}</b> left in stock - order soon.</p>
                { props.showAddToCart === true && <button 
                onClick={()=> props.addProduct(props.product)}
                className="add-cart-button"> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
           </div>
            
        </div>
    );
};

export default Product;