import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "../../containers/contact-data/ContactData";
import CheckoutSummary from "../checkout/../../components/CheckoutSummary/CheckoutSummary";

export class Checkout extends Component {
  state = {
    ingredients: 
      null
    ,
    totalPrice: 0,
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentWillMount() {
    console.log(this.props.location.search);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    });
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.checkoutCancelHandler}
          continueCheckout={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
