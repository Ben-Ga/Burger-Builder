import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

export default class BurgerBuilder extends Component {


    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                // salad: 1,
                // bacon: 1,
                // meat: 2,
                // cheese: 1,
            }
        }

    }
    render() {
        return (
            <Auxiliary>
                <div>
                    <Burger 
                        ingredients={this.state.ingredients}
                    />
                </div>
                <div>
                    <BuildControls />
                </div>
            </Auxiliary>
        )
    }
}
