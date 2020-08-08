import React from "react";

import { NavLink } from "react-router-dom";

import classes from "../../../styles/components/navitem.module.scss";

const NavItem = (props) => {
  return (
    <div className={classes.navitem}>
      <NavLink exact activeClassName={classes.active} to={props.link}>
        {props.children}
      </NavLink>
    </div>
  );
};

export default NavItem;
