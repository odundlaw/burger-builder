import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)} </strong>
      </p>
      {controls.map((control, index) => (
        <BuildControl
          key={control.type}
          label={control.label}
          addIngredients={() => props.onAddIngredients(control.type)}
          removeIngredients={() => props.onRemoveIngredients(control.type)}
          disabled={props.disableInfo[control.type]}
        />
      ))}
      <button
        disabled={!props.purchaseable}
        onClick={props.onOrder}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;