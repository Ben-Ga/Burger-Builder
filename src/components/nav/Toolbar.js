import React from 'react'

import classes from  '../../styles/containers/toolbar.module.scss'
import Logo from '../UI/Logo'
import NavItems from '../nav/NavItems/NavItems'

const Toolbar = (props) => {
    return (
        <header className={classes.toolbar}>
            <div>MENU</div>
            <Logo/>
            <nav>
                <NavItems/>
            </nav>
        </header>
    )
}

export default Toolbar
