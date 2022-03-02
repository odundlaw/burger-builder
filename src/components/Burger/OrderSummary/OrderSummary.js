import React from "react";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}:</span>
      {props.ingredients[igKey]}
    </li>
  ));
  console.log(ingredientSummary)
  return (
    <div>
      <Wrapper>
        <h3>Your Order </h3>
        <p>A Delicious Burger with the following ingredients </p>
        <ul>{ingredientSummary}</ul>
        <p><strong> Total Price: {props.price.toFixed(2)} </strong> </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
      </Wrapper>
    </div>
  );
};

export default OrderSummary;
