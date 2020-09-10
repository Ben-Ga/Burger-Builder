import React, { Component } from "react";
import Button from "../../components/UI/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input/Input";
import * as actionTypes from '../../store/actions/index'
import withErrorHandler from '../../hoc/WithErrorHandler'
import {connect } from 'react-redux'

import classes from "../../styles/containers/contact-data.module.scss";
export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3

        },
        valid: false,
        touched: false
      },
      postcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3

        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3

        },
        valid: false,
        touched: false
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          containsAt: true
        },
        valid: false,
        touched: false
      },

      deliveryOption: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    let currTime;
    currTime =
      new Date().toDateString() + " " + new Date().toLocaleTimeString();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let formElmID in this.state.orderForm) {
      formData[formElmID] = this.state.orderForm[formElmID].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      timestamp: currTime,
      orderData: formData,
    };
    this.props.onPurchaseAttempt(order, this.props.token)
  };

  inputChangedHandler = (event, inputID) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputID] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderForm[inputID] = updatedFormElement;

    let formIsValid = true;
    for(let inputIDs in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIDs].valid && formIsValid;
    }
    console.log("Entire form is valid " + formIsValid)
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if(!rules){
      return true
    }

    if(rules.required){
      isValid = value.trim() !== "" && isValid; //trim gets rid of the whitespace
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid
    }

    if(rules.containsAt){
      isValid = value.includes('@') && isValid
    }
    return isValid
  }

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key],
        valid: this.state.orderForm[key].valid
      });
    }
    console.log(formElements)
    let form = (
      <form className={classes.input}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            isValid={formElement.valid}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            touched={formElement.config.touched}
          />
        ))}

        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onPurchaseAttempt: (orderData, token) => dispatch(actionTypes.attemptBurgerPurchase(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
