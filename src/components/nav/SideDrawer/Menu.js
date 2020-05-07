import React from 'react'

import classes from '../../../styles/components/menu.module.scss'

const Menu = (props) => {
    return (
        <div onClick={props.clicked} className={classes.menu}>
            <div></div>
            <div></div>
            <div></div>

        </div>
    )
}

export default Menu
