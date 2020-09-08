import * as actionTypes from './actionTypes'
import axios from 'axios'

export const inputChanged = (updatedForm, formIsValid) => {
    return{
        type: actionTypes.inputChanged,
        updatedForm: updatedForm,
        formIsValid: formIsValid
    }
}

export const authStart =() => {
    return{
        type: actionTypes.authStart
    }
}

export const authSuccess = (authData) => {
    return{
        type: actionTypes.authSuccess,
        authData: authData        
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.authFail,
        error: error
    }
}

export const logout =() => {
    return{
        type: actionTypes.authLogout
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
          },expirationTime * 1000) //1 hour
        
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        //default action is to try to signup a user
        let authAction = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyQLwdiYY5HYVURHdunCbloY_5rDENP_4'
        if(!isSignup){ //if the mode passed is signIn use a different post
            authAction = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyQLwdiYY5HYVURHdunCbloY_5rDENP_4'
        }
        axios.post(authAction
        , {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            dispatch(authFail(err.response.data.error))
        })
        

    }
}