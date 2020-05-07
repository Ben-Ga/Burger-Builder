import React, {useState} from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from '../../styles/components/Layout.module.scss'
import Toolbar from "../nav/Toolbar";
import SideDrawer from "../nav/SideDrawer/SideDrawer";

const Layout = (props) => {

  const [showSideDrawer, setClicked] = useState(false);

  const sideDrawerCloseHandler = () =>{
    setClicked(!showSideDrawer)
  }

  return (
    <Auxiliary>
      <div>{/* Will store toolbar, sidedrawer and backdrop */}</div>
      <Toolbar toggleSideDrawer={sideDrawerCloseHandler}/>
      <SideDrawer open={showSideDrawer} closed={sideDrawerCloseHandler}/>

      <main className={classes.content}>{props.children}</main>

    </Auxiliary>
  );
};

export default Layout;
