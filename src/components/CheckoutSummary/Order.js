import React from "react";

import classes from "../../styles/components/order.module.scss";

const Order = (props) => {
  const ingredients = [];

  for (let ingrdName in props.ingredients) {
    ingredients.push({
      name: ingrdName,
      quantity: props.ingredients[ingrdName],
    });
  }

  const ingrdientsAsString = ingredients.map((ingrd) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          padding: "4px",
        }}
        key={ingrd.name.charCodeAt(1) * ingrd.name.length + Math.random()}
      >
        {ingrd.name} <strong>{ingrd.quantity}</strong>
      </span>
    );
  });
  return (
    <div className={classes.order}>
      <p>Date of Order: {props.orderDate}</p>
      <p>Ingredients:{ingrdientsAsString}</p>
      <p>
        Price: <strong>£{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
