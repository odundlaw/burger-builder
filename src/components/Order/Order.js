import React from "react";
import { objToIterables } from "../../utils/utils";
import TimeAgo from "../TimeAgo/TimeAgo";

import classes from "./Order.module.css";

function Order(props) {
  const ingrValArray = objToIterables(props.ingredients);
  const ingredientList = ingrValArray.map((ingr) => {
    return (
      <span
        key={ingr.name}
        style={{
          border: "1px solid #ccc",
          margin: "0 8px",
          display: "inline-block",
          padding: "0 5px",
          textTransform: "capitalize",
        }}
      >
        {ingr.name}: ({ingr.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientList}</p>
      <div className={classes.flexOrder}>
        <p>
          Total Price:{" "}
          <strong>USD {Number.parseFloat(props.total).toFixed()}</strong>
        </p>
        <TimeAgo time={props.timeAgo} />
        <button onClick={props.deleteOrder}>
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default Order;
