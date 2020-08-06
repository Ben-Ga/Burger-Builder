import React, { Component } from "react";
import Button from "../../components/UI/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";

import classes from "../../styles/containers/contact-data.module.scss";
export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postcode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Ben Gallagher",
        address: {
          street: "Some street",
          postcode: "NE5 5DZ",
          country: "England",
        },
        email: "bgallagher2800@gmail.com",
      },
      deliveryOption: "ASAP",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/")
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    let form = (
      <form className={classes.input}>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="postcode" placeholder="Your postcode" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.contactdata}>
        <h4>Please enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
