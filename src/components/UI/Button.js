import React from "react";

import classes from "../../styles/components/button.module.scss";

const Button = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      disabled={props.disabled}
    >
      {" "}
      {/*This allows for type of button to be selected in props */}
      {props.children}
    </button>
  );
};

export default Button;
