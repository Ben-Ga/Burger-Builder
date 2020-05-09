import React, {useState} from "react";
import Auxiliary from "../Auxiliary";
import classes from '../../styles/components/Layout.module.scss'
import Toolbar from "../../components/nav/Toolbar";
import SideDrawer from "../../components/nav/SideDrawer/SideDrawer";

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
