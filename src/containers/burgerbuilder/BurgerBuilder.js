import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const BASE_PRICE = 2.50;

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.7,
    meat: 1.20,
    bacon: 0.8,
}

export default class BurgerBuilder extends Component {


    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                 bacon: 0,
                 meat: 0,
                 cheese: 0,
            },
            totalPrice: BASE_PRICE
        }

    }

    addIngredient = (ingrType) => {
        const oldCount = this.state.ingredients[ingrType];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[ingrType] = updatedCount;

        const oldPrice = this.state.totalPrice;
        
        const updatedPrice = oldPrice + INGREDIENT_PRICES[ingrType]

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
    }

    removeIngredient = (ingrType) => {

        const oldCount = this.state.ingredients[ingrType];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[ingrType] = updatedCount

        const oldPrice = this.state.totalPrice
        const updatedPrice = oldPrice - INGREDIENT_PRICES[ingrType]

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        })

    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0; //set a true/false for each ingredient
        }
        return (
            <Auxiliary>
                <div>
                    <Burger 
                        ingredients={this.state.ingredients}
                    />
                </div>
                <div>
                    <BuildControls 
                        ingredientAdded={this.addIngredient}
                        ingredientRemoved={this.removeIngredient}
                        disabled={disableInfo}
                    />
                </div>
            </Auxiliary>
        )
    }
}
