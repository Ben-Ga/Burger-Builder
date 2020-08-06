import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler";

const BASE_PRICE = 2.5;

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.7,
  meat: 1.2,
  bacon: 0.8,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: BASE_PRICE,
      purchasable: false,
      purchasing: false,
      loading: false,
      igrError: false,
    };
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((error) => {
        this.setState({ igrError: true });
      });
  }

  checkPurchaseable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };

  addIngredient = (ingrType) => {
    const oldCount = this.state.ingredients[ingrType];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[ingrType] = updatedCount;

    const oldPrice = this.state.totalPrice;

    const updatedPrice = oldPrice + INGREDIENT_PRICES[ingrType];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.checkPurchaseable(updatedIngredients);
  };

  removeIngredient = (ingrType) => {
    const oldCount = this.state.ingredients[ingrType];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[ingrType] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - INGREDIENT_PRICES[ingrType];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.checkPurchaseable(updatedIngredients);
  };

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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });

  };
  render() {
    if (this.state.igrError) {
      return (
        <p style={{ textAlign: "center", fontSize: "xx-large", color: "Red" }}>
          Ingredients were unable to be loaded
        </p>
      );
    }
    if (this.state.ingredients) {
      const disableInfo = {
        ...this.state.ingredients,
      };
      for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0; //set a true/false for each ingredient
      }

      let orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.cancelPurchaseHandler}
          purchaseContinued={this.continuePurchaseHandler}
          sum={this.state.totalPrice}
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
            <Burger ingredients={this.state.ingredients} />
          </div>
          <div>
            <BuildControls
              ingredientAdded={this.addIngredient}
              ingredientRemoved={this.removeIngredient}
              disabled={disableInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);
