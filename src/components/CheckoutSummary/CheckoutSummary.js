import React from 'react'

import classes from "../../styles/components/checkoutsummary.module.scss"
import Burger from '../Burger/Burger'
import Button from '../UI/Button'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Review your order and continue to purchasing</h1>
            <div className="burgerPreview" style={{width: '100%'}}>
                <Burger 
                    ingredients={props.ingredients}
                />
                <Button
                    btnType="Danger"
                    clicked={props.cancelCheckout}
                >Cancel</Button>
                <Button
                    btnType="Success"
                    clicked={props.continueCheckout}
                >Finish & Pay</Button>
            </div>
        </div>
    )
}

export default CheckoutSummary
