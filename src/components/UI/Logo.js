import React from 'react'

import burgerLogo from '../../assets/images/tomaslogo.jpg';
import classes from '../../styles/containers/logo.module.scss'

const Logo = (props) => {
    return (
        <div className={classes.logo}>
            <img src={burgerLogo} alt="tomas_logo"/>
        </div>
    )
}

export default Logo
