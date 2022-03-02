import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Inputs from "../../../components/UI/Inputs/Inputs";
import Spinner from "../../../components/UI/Spinner/Spinner";
import WithRouter from "../../../hoc/Layout/WithRouter/WithRouter";
import WithError from "../../../hoc/WithError/WithError";
import { checkValidity } from "../../../utils/utils";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    loading: false,
    orderForm: {
      name: {
        inputType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Name",
        },
        value: "",
        validation: {
          required: true,
          validationMsg: "Name can't be Empty",
        },
        valid: false,
        touched: false,
      },
      email: {
        inputType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Enter your E-mail",
        },
        value: "",
        validation: {
          required: true,
          validationMsg: "Enter a valid Email address",
        },
        valid: false,
        touched: false,
      },
      street: {
        inputType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Street",
        },
        value: "",
        validation: {
          required: true,
          validationMsg: "Street cant be empty",
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        inputType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5,
          validationMsg: "Enter a valid Postal Code between 3 to 5 characters",
        },
        valid: false,
        touched: false,
      },
      country: {
        inputType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Country",
        },
        value: "",
        validation: {
          required: true,
          validationMsg: "Country can't be empty",
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        inputType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayMethod: "Fastest" },
            { value: "cheapest", displayMethod: "Cheapest" },
          ],
        },
        value: "",
        valid: true,
      },
    },
  };

  componentDidMount() {
    const { ingredients, totalPrice } = this.props.outletContext;
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  orderHandler = (event) => {
    event.preventDefault();
    const orderDetails = {};
    for (let key in this.state.orderForm) {
      orderDetails[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: orderDetails,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, ingredients: null, totalPrice: 0 });
        this.props.navigate("/", { replace: true });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  inputChangeHandler = (event, elementIdentifier) => {
    const orderForm = { ...this.state.orderForm };
    const orderFormElementIdentifier = {
      ...orderForm[elementIdentifier],
    };
    orderFormElementIdentifier.value = event.target.value;
    if (orderFormElementIdentifier.validation) {
      orderFormElementIdentifier.valid = checkValidity(
        orderFormElementIdentifier.value,
        orderFormElementIdentifier.validation
      );
    }
    orderFormElementIdentifier.touched = true;
    orderForm[elementIdentifier] = orderFormElementIdentifier;

    this.setState({ orderForm: orderForm });
  };

  render() {
    const elementFormArray = [];
    let formIsvalid = true;
    for (let key in this.state.orderForm) {
      elementFormArray.push({ id: key, config: this.state.orderForm[key] });
      formIsvalid = this.state.orderForm[key].valid && formIsvalid;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Details here</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {elementFormArray.map((element) => {
              return (
                <Inputs
                  key={element.id}
                  elementConfig={element.config.elementConfig}
                  inputType={element.config.inputType}
                  value={element.config.value}
                  inValid={!element.config.valid}
                  hasValidation={element.config.validation}
                  touched={element.config.touched}
                  changed={(event) =>
                    this.inputChangeHandler(event, element.id)
                  }
                />
              );
            })}

            <Button btnType="Success" disabled={!formIsvalid}>ORDER NOW!</Button>
          </form>
        )}
      </div>
    );
  }
}

export default compose(WithRouter, WithError)(ContactData, axios);
