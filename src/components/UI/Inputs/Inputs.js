import React from "react";

import classes from "./Inputs.module.css";

function Inputs({ inputType, label, ...props }) {
  const classArray = [];
  classArray.push(classes.InputElement);
  if (props.inValid && props.hasValidation && props.touched)classArray.push(classes.Invalid);

  let inputElement;

  switch (inputType) {
    case "input":
      inputElement = (
        <input
          className={classArray.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classArray.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayMethod}
            </option>
          ))}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={classArray.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={classArray.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  let validationMsg = "";
  if(props.inValid & props.touched && props.hasValidation){
    validationMsg = <span className={classes.ErrorMsg}>{props.hasValidation.validationMsg}</span>
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationMsg}
    </div>
  );
}

export default Inputs;