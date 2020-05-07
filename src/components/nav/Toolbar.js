import React from "react";

import classes from "../../styles/containers/toolbar.module.scss";
import Logo from "../UI/Logo";
import NavItems from "../nav/NavItems/NavItems";
import Menu from "./SideDrawer/Menu";


const Toolbar = (props) => {
  return (
    <header className={classes.toolbar}>
      <Menu clicked={props.toggleSideDrawer}/>
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={classes.desktoponly}>
        <NavItems />
      </nav>
    </header>
  );
};

export default Toolbar;
