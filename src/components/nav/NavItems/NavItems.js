import React from "react";

import classes from "../../../styles/containers/navitems.module.scss";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const NavItems = (props) => {
  const state = useSelector((state) => state.authReducer);
  return (
    <ul className={classes.navitems}>
      <NavItem link="/">Burger Builder</NavItem>
      {state.token ? <NavItem link="/orders">Orders</NavItem> : null }
      {state.token ? (
        <NavItem link="/logout">Logout</NavItem>
      ) : (
        <NavItem link="/auth">SignIn/Register</NavItem>
      )}
    </ul>
  );
};

export default NavItems;
