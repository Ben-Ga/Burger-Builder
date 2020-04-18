import React from 'react'

import classes from '../../../styles/components/control.module.scss'

const BuildControl = (props) => {
    return (
        <div className={classes.buildControl}>
            <div className={classes.controlTitle}>{props.ingrdTitle}</div>
            <button>Add</button>
            <button>Remove</button>
        </div>
    )
}

export default BuildControl
