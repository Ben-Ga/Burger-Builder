import * as actionTypes from "../actions/actions";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  totalPrice: 4,
  ingredientPrices: {
    salad: 0.4,
    cheese: 0.8,
    meat: 1.2,
    bacon: 1.0,
  },
  purchaseable: false,
};

const addIngredient = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addIngredient:
      return {
        ...state,
        ingredients: {
          ...state.ingredients, //deep clone
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          // [action...]: expects a name that is within state.ingredients, that we will recieve from the action payload
          // then we can assign a new value, by going to that ingredient again, and adding one
        },
        totalPrice:
          state.totalPrice + state.ingredientPrices[action.ingredientName],
        purchaseable: check
      };
    case actionTypes.removeIngredient:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - state.ingredientPrices[action.ingredientName],
          purchaseable: check
      };

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
    return sum > 0 && state.totalPrice !== 4
}



export default addIngredient;
