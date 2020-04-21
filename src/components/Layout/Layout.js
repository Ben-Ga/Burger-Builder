import React, {useContext} from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from '../../styles/components/Layout.module.scss'
import Toolbar from "../nav/Toolbar";

const Layout = (props) => {

  return (
    <Auxiliary>
      <div>{/* Will store toolbar, sidedrawer and backdrop */}</div>
      <Toolbar/>

      <main className={classes.content}>{props.children}</main>

    </Auxiliary>
  );
};

export default Layout;
