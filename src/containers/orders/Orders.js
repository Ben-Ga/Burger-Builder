import React, { Component } from "react";

import classes from "../../styles/containers/orders.module.scss";
import Order from "../../components/CheckoutSummary/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from '../../hoc/WithErrorHandler'
import {connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'

export class Orders extends Component {

  componentDidMount() {
    this.props.onLoadOrders()
  }
  render() {
    let orders;

    if (this.props.loading) {
      orders = <Spinner />;
    } else {
      orders = this.props.orders.map((order) => {
        return (
          <Order
            ingredients={order.ingredients}
            price={+order.price}
            orderDate={order.timestamp}
            key={order.id}
          />
        );
      });
    }
    return <div className={classes.orders}>{orders}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onLoadOrders: () => dispatch(actionTypes.loadOrders())
  }
}

const mapStateToProps = (state) => {
  return{
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(withErrorHandler(Orders, axios));