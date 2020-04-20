import React from 'react'

import classes from '../../../styles/components/control.module.scss'

const BuildControl = (props) => {
    return (
        <div className={classes.buildControl}>
            <div className={classes.controlTitle}>{props.ingrdTitle}</div>
            <button onClick={props.added}>Add</button>
            <button onClick={props.removed} disabled={props.disabled}>Remove</button>
        </div>
    )
}

export default BuildControl
