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
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label}
                    ingrdTitle={ctrl.label}
                />
            ))}
        </div>
    )
}

export default BuildControls
