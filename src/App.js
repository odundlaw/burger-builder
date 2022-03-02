import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout';
import { Route, Routes } from 'react-router';
import ContactData from './containers/checkout/contactData/ContactData';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render(){
    return(
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<BurgerBuilder />} />
            <Route path="/checkout" element={<Checkout />} >
              <Route path="/checkout/contact-data" element={<ContactData />} />
            </Route>
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
    )
  }
}

export default App;
