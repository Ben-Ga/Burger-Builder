import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler";
import * as actionTypes from '../../store/actions/actions'
import {connect} from 'react-redux'




class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false,
      igrError: false,
    };
  }

  componentDidMount() {
    
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     this.setState({
    //       ingredients: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({ igrError: true });
    //   });
  }


  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  continuePurchaseHandler = () => {
    this.props.history.push('/checkout')
  };

  render() {
    if (this.state.igrError) {
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

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }

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
    onIngredientAdded: (ingrName) => dispatch({type: actionTypes.addIngredient, ingredientName: ingrName}),
    onIngredientRemoved: (ingrName) => dispatch({type: actionTypes.removeIngredient, ingredientName: ingrName}),
  }
}

const mapStateToProps = state => {
  return{
    ingrds: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchaseable
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
