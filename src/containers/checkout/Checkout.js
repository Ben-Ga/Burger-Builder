import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../../containers/contact-data/ContactData";
import CheckoutSummary from "../checkout/../../components/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";

export class Checkout extends Component {



  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedir = this.props.purchased  ? <Redirect to="/"/> : null
      summary = (
        <div>
          {purchasedRedir}
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
    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased
  };
};


export default connect(mapStateToProps )(Checkout);
