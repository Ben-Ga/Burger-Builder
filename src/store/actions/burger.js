import * as actionTypes from "../actions/actionTypes";
import axios from '../../axios-orders'


//ACTION CREATORss
export const addIngrdient = (ingrdName) => {
  return {
    type: actionTypes.addIngredient,
    ingredientName: ingrdName,
  };
};

export const removeIngrdient = (ingrdName) => {
  return {
    type: actionTypes.removeIngredient,
    ingredientName: ingrdName,
  };
};

//sync action creator
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.setIngredients,
    payload: ingredients,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then((response) => {
          dispatch(setIngredients(response.data))
      })
      .catch((error) => {
          dispatch(fetchIngFailure())
        });
  };
};

export const fetchIngFailure = () => {
  return {
    type: actionTypes.fetchIngFailure
  };
};
