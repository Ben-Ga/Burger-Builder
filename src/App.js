import React from "react";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/burgerbuilder/BurgerBuilder";
import Checkout from "./containers/checkout/Checkout";
import Orders from './containers/orders/Orders'

import { Route, Switch } from "react-router-dom";
import auth from "./containers/auth/Auth";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/auth" component={auth}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders}/>
          <Route path="" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
