import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

const Layout = (props) => {
  return (
    <Auxiliary>
      <div>{/* Will store toolbar, sidedrawer and backdrop */}</div>

      <main>{props.children}</main>
    </Auxiliary>
  );
};

export default Layout;
