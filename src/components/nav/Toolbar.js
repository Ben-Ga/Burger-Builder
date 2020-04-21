import React from 'react'

import classes from  '../../styles/containers/toolbar.module.scss'
import Logo from '../UI/Logo'

const Toolbar = (props) => {
    return (
        <header className={classes.toolbar}>
            <div>MENU</div>
            <Logo/>
            <nav>
                ...
            </nav>
        </header>
    )
}

export default Toolbar
