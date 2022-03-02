import React, { Component } from "react";
import { Outlet } from "react-router";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithRouter from "../../hoc/Layout/WithRouter/WithRouter";
import { searcParamsToObject } from "../../utils/utils";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    disableBtn: false,
  };

  componentDidMount() {
    const params = this.props.searchParams;
    const [ingredients, totalPrice] = searcParamsToObject(params);
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  checkoutCancelHandler = () => {
    const from = this.props.location.state?.from?.pathname || "/";
    const [ingredients, totalPrice] = searcParamsToObject(
      this.props.searchParams
    );
    this.props.navigate(from, {
      state: { ingredients: ingredients, totalPrice: totalPrice },
    });
  };

  checkoutContinueHandler = () => {
    this.setState({ disableBtn: true });
    this.props.navigate(
      `${this.props.location.pathname}/contact-data${this.props.location.search}`,
      { replace: true }
    );
  };

  render() {
    const contextObject = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
    };
    let summary = <Spinner />;
    if (this.state.ingredients) {
      summary = (
        <>
          <CheckoutSummary
            ingredients={this.state.ingredients}
            checkoutContinue={this.checkoutContinueHandler}
            checkoutCancel={this.checkoutCancelHandler}
            disableBtn={this.state.disableBtn}
          />
          <Outlet context={contextObject} />
        </>
      );
    }
    return summary;
  }
}

export default WithRouter(Checkout);
