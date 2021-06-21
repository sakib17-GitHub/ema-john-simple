import React from 'react';

const ReviewItem = (props) => {
    const {name , img , quantity , key , price} = props.product;
    
    return (
       
                <div className="product">

                    <div >
                        <img src={img} alt=""/>
                    </div>

                    <div >
                        <h4 className="product-name">{name}</h4>
                        <p> Quantity : {quantity}</p>
                        <p>$ {price}</p>
                        <button onClick={() => props.removeProduct(key)}  className="add-cart-button">Remove-Item</button>
                    </div>
                    
                </div>

               
      
    );
};

export default ReviewItem;