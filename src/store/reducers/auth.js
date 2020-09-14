import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    controls: {
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Your email",
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
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password",
            },
            value: "",
            validation: {
              required: true,
              minLength: 6
            },
            valid: false,
            touched: false
          },
    },
    formIsValid: false,
    token: null,
    userID: null,
    error: null,
    loading: false,
    authRedirectPath: null

}



const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.getAuthForm:
            return state
        case actionTypes.inputChanged:
          return {
            ...state,
            controls: action.updatedForm,
            formIsValid: action.formIsValid
          }
        case actionTypes.authStart:
          return updateObject(state, {loading: true, error: null})
        case actionTypes.authSuccess:
          return {
            ...state,
            token: action.token,
            userID: action.userID,
            loading: false
          }
        case actionTypes.authFail:
          return{
            ...state,
            error: action.error,
            loading: false
          }
        case actionTypes.authLogout:
          return{
            ...state,
            token: null,
            userID: null
          }
        case actionTypes.setAuthRedirectPath:
          return{
            ...state,
            authRedirectPath: action.path
          }
        default: return state

    }
}

export default authReducer