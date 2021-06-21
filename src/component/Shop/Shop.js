import React, { useState , useEffect} from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart , getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0 , 10)
    const [products , setProducts] = useState(first10);
    
    const [cart , setCart]= useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();        
        const savedCartKey = Object.keys(savedCart);
       
        const previousCart = savedCartKey.map(pdKey => {

            const product = fakeData.find(pd => pd.key ===pdKey);
            product.quantity = savedCart[pdKey];
            return product;    
        })
        setCart(previousCart);
    } , [])
    

    const handleAddProduct =(product)=>{
        const addToKey = product.key;
        let count = 1;
        let newCart ;

        const sameProduct = cart.find(pd => addToKey === pd.key)

        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => addToKey !== pd.key)
            newCart = [...others , sameProduct] ;
        }

        else{
            product.quantity = 1 ;
            newCart = [...cart , product];
        } 

        setCart(newCart);
        addToDatabaseCart(product.key , count)
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">                   
               
                {
                    products.map(pd => <Product addProduct={handleAddProduct}
                                                key={pd.key}
                                                showAddToCart={true}
                                                product={pd}></Product>)
                }
               
            </div>

            <div className="cart-container">
                    
                    <Cart cart={cart}>
                    <Link to="/order"><button className="add-cart-button"> Order Review </button> </Link></Cart>
            
            </div>                
        </div>
    );
};

export default Shop;