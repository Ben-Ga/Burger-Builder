import React from 'react'

import classes from '../../styles/components/modal.module.scss'

const Modal = (props) => {
    return (
        <div className={classes.Modal}
             style={{
                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0'
             }}>
            {props.children}
        </div>
    )
}

export default Modal
