import React from "react";
import Logo from "../../UI/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop";
import Auxiliary from '../../../hoc/Auxiliary'

import classes from "../../../styles/containers/sidedrawer.module.scss";

const SideDrawer = (props) => {


    let attachedClasses = [classes.sidedrawer, classes.closed]
    if(props.open){
        attachedClasses = [classes.sidedrawer, classes.open]
    }
  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavItems/>
        </nav>
      </div>
    </Auxiliary>
  );
};

export default SideDrawer;
