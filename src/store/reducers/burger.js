import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  ingredientPrices: {
    salad: 0.4,
    cheese: 0.8,
    meat: 1.2,
    bacon: 1.0,
  },
  purchaseable: false,
  loading: false,
  error: false,
};

const caseAddIngredient =  (state, action) => {
        // [action...]: expects a name that is within state.ingredients, that we will recieve from the action payload
      // then we can assign a new value, by going to that ingredient again, and adding one
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.ingredientPrices[action.ingredientName],
        purchaseable: check
      }
      return updateObject(state, updatedState)
}

const caseRemoveIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - state.ingredientPrices[action.ingredientName],
    purchaseable: check
  }

  return updateObject(state, updatedState)

}

//need to refractor name here
const addIngredient = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addIngredient: return caseAddIngredient(state, action)
    case actionTypes.removeIngredient: return caseRemoveIngredient(state, action)
    case actionTypes.setIngredients:
      return {
        ...state,
        ingredients: {
          salad: action.payload.salad,
          bacon: action.payload.bacon,
          cheese: action.payload.cheese,
          meat: action.payload.meat,
        },
        totalPrice: 4,
        error: false,
      };
    case actionTypes.fetchIngFailure:
      return updateObject(state, {error: true});

    default:
      return state;
  }
};

const check = (state = initialState) => {
  const sum = Object.keys(state.ingredients)
    .map((igKey) => {
      return state.ingredients[igKey];
    })
    .reduce((sum, elm) => {
      return sum + elm;
    }, 0);
  return sum > 0 && state.totalPrice !== 4;
};

export default addIngredient;
