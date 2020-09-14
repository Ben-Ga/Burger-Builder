import * as actionTypes from "./actionTypes";
import axios from "axios";

export const inputChanged = (updatedForm, formIsValid) => {
  return {
    type: actionTypes.inputChanged,
    updatedForm: updatedForm,
    formIsValid: formIsValid,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.authStart,
  };
};

export const authSuccess = (token, userID) => {
  return {
    type: actionTypes.authSuccess,
    token: token,
    userID: userID,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.authFail,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userID");

  return {
    type: actionTypes.authLogout,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000); //1 hour
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.setAuthRedirectPath,
    path: path,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    //default action is to try to signup a user
    let authAction =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyQLwdiYY5HYVURHdunCbloY_5rDENP_4";
    if (!isSignup) {
      //if the mode passed is signIn use a different post
      authAction =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyQLwdiYY5HYVURHdunCbloY_5rDENP_4";
    }
    axios
      .post(authAction, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        ); //calc expiration date
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userID", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userID = localStorage.getItem("userID");
        dispatch(authSuccess(token, userID));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
