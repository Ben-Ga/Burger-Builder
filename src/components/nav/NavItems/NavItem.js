import React from "react";

import classes from "../../../styles/components/navitem.module.scss";

const NavItem = (props) => {
  return (
    <div className={classes.navitem}>
      <a href={props.link} className={props.active ? classes.active : null}>
        {props.children}
      </a>
    </div>
  );
};

export default NavItem;
