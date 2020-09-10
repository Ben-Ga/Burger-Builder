import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (orderID, orderData) => {
  return {
    type: actionTypes.purchaseBurgerSuccess,
    orderID: orderID,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.purchaseBurgerFailed,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.purchaseBurgerStart,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.purchaseInit
  }
}

export const attemptBurgerPurchase = (orderData, token) => {
  return (dispatch) => {
      dispatch(purchaseBurgerStart())
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const loadOrders  = (token) => {
  return (dispatch) => {
    dispatch(loadOrdersStart())
    axios.get('/orders.json?auth=' + token)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key], //get all of the nested data at location key
            id: key, //keep the key
          });
        }
        dispatch(loadOrdersSuccess(fetchedOrders))
      })
      .catch((err) => {
        dispatch(loadOrdersError(err))
      })
  }
}

export const loadOrdersSuccess = (orders) => {
  return{
    type: actionTypes.loadOrdersSuccess,
    orders: orders
  }
}

export const loadOrdersError = (error) => {
  return{
    type: actionTypes.loadOrdersError,
    error: error
  }
}

export const loadOrdersStart = () => {
  return {
    type: actionTypes.loadOrdersStart
  }
}