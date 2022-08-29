import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Inputs from "../../../components/UI/Inputs/Inputs";
import Spinner from "../../../components/UI/Spinner/Spinner";
import WithRouter from "../../../hoc/Layout/WithRouter/WithRouter";
import WithError from "../../../hoc/WithError/WithError";
import { addOrders } from "../../../redux/reducers/orders";
import { setIngredientsToDefault } from "../../../redux/reducers/ingredients";
import { checkValidity } from "../../../utils/utils";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
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
    const { isLoggedIn, email, displayName } = this.props.user;
    if (isLoggedIn) {
      this.setState((prevState) => {
        const copiedOrderFormObject = {
          ...prevState.orderForm,
          name: {
            value: displayName ? displayName : "",
            valid: displayName ? true : false,
            elementConfig: {
              readOnly: displayName ? true : false,
              placeholder: !displayName ? "Enter your Full Name" : "",
            },
            validation: {
              required: true,
              validationMsg: "Name can't be Empty",
            },
          },
          email: {
            value: email ? email : "",
            valid: email ? true : false,
            elementConfig: {
              readOnly: true,
            },
          },
        };
        return {
          ...prevState,
          orderForm: copiedOrderFormObject,
        };
      });
    }
  }

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderDetails = {};
    const { accessToken } = this.props.user;
    for (let key in this.state.orderForm) {
      orderDetails[key] = this.state.orderForm[key].value;
    }
    const order = {
      orderData: {
        ingredients: this.props.burger.ingredients,
        totalPrice: this.props.burger.totalPrice,
        customer: orderDetails,
        date: new Date().toISOString(),
      },
      accessToken: accessToken,
    };

    try {
      await this.props.addOrders(order).unwrap();
      this.setState({
        loading: false /* ingredients: null, totalPrice: 0 */,
      });
      if (this.props.setIngredientsToDefault()) {
        this.props.navigate("/orders", { replace: true });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
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

            <Button btnType="Success" disabled={!formIsvalid}>
              ORDER NOW!
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    burger: state.ingredients,
    user: state.user,
  };
};

const mapDispatchToProps = () => ({
  addOrders,
  setIngredientsToDefault,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps()),
  WithRouter,
  WithError
)(ContactData, axios);
