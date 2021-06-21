import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [userLoggedIn , setUserLoggedIn] = useContext(UserContext);
    return (
       
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                <Link onClick={()=>setUserLoggedIn({})}>Sign Out</Link>
            </nav>
                
        </div>
    );
};

export default Header;