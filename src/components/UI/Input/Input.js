import React from "react";

import classes from "../../../styles/components/input.module.scss";

const Input = (props) => {
  let inputElm = null;

  switch (props.elementType) {
    case "input":
      inputElm = (
        <input
          className={
            !props.isValid && props.touched
              ? classes.inputnotValid
              : classes.inputelm
          }
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElm = (
        <textarea
          className={
            !props.isValid && props.touched
              ? classes.inputnotValid
              : classes.inputelm
          }
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElm = (
        <select
          className={classes.inputelm}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElm = (
        <input
          className={
            !props.isValid && props.touched
              ? classes.inputnotValid
              : classes.inputelm
          }
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      {inputElm}
    </div>
  );
};

export default Input;
