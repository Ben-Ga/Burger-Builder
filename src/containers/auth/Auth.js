import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import * as actionTypes from "../../store/actions/index";
import classes from "../../styles/containers/auth.module.scss";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  inputChangedHandler = (event, inputID) => {
    const updatedOrderForm = {
      ...this.props.formData,
    };
    const updatedFormElement = { ...updatedOrderForm[inputID] };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputID] = updatedFormElement;

    let formIsValid = true;
    for (let inputIDs in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIDs].valid && formIsValid;
    }
    this.props.onInputChanged(updatedOrderForm, formIsValid);
  };

  checkValidity = (elementValue, elementRules) => {
    let validity = true;

    if (elementRules.containsAt) {
      if (elementValue.includes("@")) {
      } else {
        validity = false;
      }
    }

    if (elementRules.required) {
      if (elementValue.trim() !== "") {
      } else {
        validity = false;
      }
    }

    if (elementRules.minLength) {
      if (elementValue.length >= elementRules.minLength) {
      } else {
        validity = false;
      }
    }

    return validity;
  };

  submitFormHandler = (event) => {
    event.preventDefault();
    this.props.authenticateUser(
      this.props.formData.email.value,
      this.props.formData.password.value,
      this.state.isSignup
    );
  };

  switchAuthAction = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  componentDidMount() {
    if(!this.props.isBuilding && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath()
    }
  }


  state = {
    isSignup: true,
  };

  render() {
    let formElements = [];
    for (let element in this.props.formData) {
      formElements.push({
        elementName: element,
        elementConfig: this.props.formData[element],
      });
    }

    let errorMessage = null;
    if (this.props.authError) {
      errorMessage = <h3>{this.props.authError.message}</h3>; //message provided by firebase
    }
    let form = null;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = (
        <div className={classes.authForm}>
          {errorMessage}
          <form onSubmit={this.submitFormHandler}>
            {formElements.map((element) => {
              return (
                <Input
                  key={element.elementName}
                  elementType={element.elementConfig.elementType}
                  elementConfig={element.elementConfig.elementConfig}
                  value={element.elementConfig.value}
                  changed={(event) =>
                    this.inputChangedHandler(event, element.elementName)
                  }
                  isValid={element.elementConfig.valid}
                  touched={element.elementConfig.touched}
                />
              );
            })}
            <Button btnType="Success" disabled={!this.props.formIsValid}>
              {this.state.isSignup ? (
                <span style={this.props.formIsValid ? { color: "gold" } : null}>
                  Register
                </span>
              ) : (
                <span>Go</span>
              )}
            </Button>
          </form>
          <Button btnType="Danger" clicked={this.switchAuthAction}>
            Go To{" "}
            {this.state.isSignup ? <span>Sign-in</span> : <span>Sign-up</span>}
          </Button>
        </div>
      );
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div>
        {authRedirect}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formData: state.authReducer.controls,
    formIsValid: state.authReducer.formIsValid,
    loading: state.authReducer.loading,
    authError: state.authReducer.error,
    isAuthenticated: state.authReducer.token,
    authRedirectPath: state.authReducer.authRedirectPath,
    isBuilding: state.burgerReducer.isBuilding
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChanged: (updatedForm, formIsValid) =>
      dispatch(actionTypes.inputChanged(updatedForm, formIsValid)),
    authenticateUser: (email, password, isSignup) =>
      dispatch(actionTypes.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actionTypes.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
