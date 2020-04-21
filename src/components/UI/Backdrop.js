import React from 'react'

import classes from '../../styles/components/backdrop.module.scss'

const Backdrop = (props) => {
    return (
        props.show ? <div className={classes.backdrop} onClick={props.clicked}>  </div> : null
    )
}

export default Backdrop
