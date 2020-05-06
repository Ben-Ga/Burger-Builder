import React from "react";

import classes from "../../../styles/containers/navitems.module.scss";
import NavItem from "./NavItem";

const NavItems = (props) => {
  return (
    <ul className={classes.navitems}>
      <NavItem link="/" active>
        Burger Builder
      </NavItem>
      <NavItem link="/">Checkout</NavItem>
    </ul>
  );
};

export default NavItems;
