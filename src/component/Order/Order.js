import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart , processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Order = () => {
    const [cart , setCart] = useState([]);
    const [placeOrder , setPlaceOrder] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push("/shipment")
        
    }

    const removeProduct = (productKey) =>{
       const newCart = cart.filter(pd => pd.key !== productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart ();
        const savedCartKeys = Object.keys(savedCart);

        const cartProduct = savedCartKeys.map(keys => {
            const product = fakeData.find(pd => pd.key === keys)
            product.quantity = savedCart[keys];
            return product;

        })
       setCart(cartProduct);


    },[])
    let happyImage ;
    if(placeOrder){
        happyImage = <img src={happyImg} alt=""/>
    }
    return (
        <div className="shop-container">
           
           <div className="product-container">
                { 
                cart.map(pd => <ReviewItem removeProduct={removeProduct} product={pd} key={pd.key}></ReviewItem>)
                }

                {
                happyImage
                }

           </div>

           <div className="cart-container">
                    
                 <Cart cart={cart}>
                 <button onClick={handleProceedCheckout} className="add-cart-button">Proceed-Checkout</button>
                 </Cart>
            
            </div> 

            
        </div>
       
    );
};

export default Order;