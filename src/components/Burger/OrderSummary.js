import React from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Button from "../UI/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your current order</h3>
      <p>Current Ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>Sum : {parseFloat(props.sum).toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        CANCEL
      </Button>

        <Button clicked={props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>

    </Auxiliary>
  );
};

export default OrderSummary;
