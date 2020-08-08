import React, { Component } from "react";

import classes from "../../styles/containers/orders.module.scss";
import Order from "../../components/CheckoutSummary/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from '../../hoc/WithErrorHandler'

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    axios
      .get("/orders.json")
      .then((response) => {
        //need to turn the data into an array so we can use map() on it later
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key], //get all of the nested data at location key
            id: key, //keep the key
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders,
        });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    let orders;

    if (this.state.loading) {
      orders = <Spinner />;
    } else {
      orders = this.state.orders.map((order) => {
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

export default withErrorHandler(Orders, axios);
