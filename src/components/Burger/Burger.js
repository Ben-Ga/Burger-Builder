import React from "react";

import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

import classes from "../../styles/components/burger.module.scss";

const Burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(ingrd => {
    return [...Array(props.ingredients[ingrd])].map((_, i) => {
      return <BurgerIngredient key={ingrd + i} ingredientType={ingrd} />;
    });
  }).reduce((arr, elm) =>{ return arr.concat(elm)}, []);
   //turn the object passed, into set of arrays of length the value that each key was assigned in state of BurgerBuilder
   //the reduce function then flattens the array, allowing us to check its length properly

  return (
    <div className={classes.burger}>
      <BurgerIngredient ingredientType="bread-top" />
      {transformedIngredients.length > 0 ? transformedIngredients : <p>Please start adding ingredients</p>}
      <BurgerIngredient ingredientType="bread-bottom" />
    </div>
  );
};

export default Burger;
