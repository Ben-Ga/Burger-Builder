import React from 'react'

import classes from '../../../styles/components/build.module.scss'

import BuildControl from './BuildControl'

const controls = [
    { label : 'Salad', ingredient: 'salad'},
    { label : 'Bacon', ingredient: 'bacon'},
    { label : 'Cheese', ingredient: 'cheese'},
    { label : 'Meat', ingredient: 'meat'},

]

const BuildControls = (props) => {
    return (
        <div className={classes.buildControls}>
            <p>Current Price <strong>{parseFloat(props.price).toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label}
                    ingrdTitle={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.ingredient)}
                    removed={() => props.ingredientRemoved(ctrl.ingredient)}
                    disabled={props.disabled[ctrl.ingredient]}

                />
            ))}
        </div>
    )
}

export default BuildControls
