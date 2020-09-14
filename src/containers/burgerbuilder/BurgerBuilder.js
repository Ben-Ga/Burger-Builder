import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler";
import axios from '../../axios-orders'
import * as actionTypes from '../../store/actions/index'
import {connect} from 'react-redux'




class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,

    };
  }

  componentDidMount() {
    this.props.onInitIngredients()

  }


  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({
        purchasing: true,
      });
    }else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  continuePurchaseHandler = () => {
    this.props.history.push('/checkout')
    this.props.onInitPurchase()
  };

  render() {
    if (this.props.error) {
      return (
        <p style={{ textAlign: "center", fontSize: "xx-large", color: "Red" }}>
          Ingredients were unable to be loaded
        </p>
      );
    }
    if (this.props.ingrds) {
      const disableInfo = {
        ...this.props.ingrds,
      };
      for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0; //set a true/false for each ingredient
      }

      let orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrds}
          purchaseCancelled={this.cancelPurchaseHandler}
          purchaseContinued={this.continuePurchaseHandler}
          sum={this.props.totalPrice}
        />
      );


      return (
        <Auxiliary>
          <Modal
            show={this.state.purchasing}
            modalClose={this.cancelPurchaseHandler}
          >
            {orderSummary}
          </Modal>
          <div>
            <Burger ingredients={this.props.ingrds} />
          </div>
          <div>
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disableInfo}
              price={this.props.totalPrice}
              purchasable={this.props.purchasable}
              purchasing={this.purchaseHandler}
              isAuth={this.props.isAuthenticated}
            />
          </div>
        </Auxiliary>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingrName) => dispatch(actionTypes.addIngrdient(ingrName)),
    onIngredientRemoved: (ingrName) => dispatch(actionTypes.removeIngrdient(ingrName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
  }
}

const mapStateToProps = state => {
  return{
    ingrds: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    purchasable: state.burgerReducer.purchaseable,
    error: state.burgerReducer.error,
    isAuthenticated: state.authReducer.token
  }
}



export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
