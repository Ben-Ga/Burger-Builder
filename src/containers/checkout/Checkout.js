import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "../../containers/contact-data/ContactData";
import CheckoutSummary from "../checkout/../../components/CheckoutSummary/CheckoutSummary";
import {connect } from 'react-redux'

export class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelCheckout={this.checkoutCancelHandler}
          continueCheckout={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);
