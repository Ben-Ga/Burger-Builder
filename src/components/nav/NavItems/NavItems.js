import React from "react";

import classes from "../../../styles/containers/navitems.module.scss";
import NavItem from "./NavItem";

const NavItems = (props) => {
  return (
    <ul className={classes.navitems}>
      <NavItem link="/">
        Burger Builder
      </NavItem>
      <NavItem link="/orders">Orders</NavItem>
    </ul>
  );
};

export default NavItems;
