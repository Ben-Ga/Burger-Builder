import React from "react";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/burgerbuilder/BurgerBuilder";
import Checkout from "./containers/checkout/Checkout";

import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
