import React from "react";
import Logo from "../../UI/Logo";
import NavItems from "../NavItems/NavItems";

import classes from "../../../styles/containers/sidedrawer.module.scss";

const SideDrawer = (props) => {
  return (
    <div className={classes.sidedrawer}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
