import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Order from './component/Order/Order';
import Manage from './component/Manage/Manage';
import Notfound from './component/Notfound/Notfound';
import ProductDetails from './component/ProductDetails/ProductDetails';
import LogIn from './component/LogIn/LogIn';
import Shipment from './component/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();



function App() {
  const [userLoggedIn , setUserLoggedIn] = useState({});

  return (
   <Router>
      <UserContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
        
        <Header></Header>    
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>

            <Route path="/order">
              <Order></Order>
            </Route>

            <PrivateRoute path="/manage">
              <Manage></Manage>
            </PrivateRoute>

            <Route path="/login">
             <LogIn></LogIn>
            </Route>

            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>

            <Route exact path="/">
              <Shop></Shop>
            </Route>
            
            <Route path="/product/:key">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="*">
              <Notfound></Notfound>
            </Route>

          </Switch>
      
      </UserContext.Provider>
   </Router>
  );
}

export default App;
