import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
/* import Spinner from "../../components/UI/Spinner/Spinner"; */
import WithRouter from "../../hoc/Layout/WithRouter/WithRouter";

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.navigate("/checkout");
  };

  checkoutContinueHandler = () => {
    const { isLoggedIn } = this.props.user;
    const { navigate } = this.props;
    const from = "/checkout/contact-data";
    if (!isLoggedIn) {
      return navigate("/auth", { state: { from: from } });
    }
    navigate(from, { replace: true });
  };

  redirectIfNoIngredient = () => {
    this.props.navigate("/");
  };

  render() {
    const { Redirect } = this.props;
    let summary = <Redirect to="/" />;
    if (this.props.burger.ingredients) {
      summary = (
        <>
          <CheckoutSummary
            ingredients={this.props.burger.ingredients}
            checkoutContinue={this.checkoutContinueHandler}
            checkoutCancel={this.checkoutCancelHandler}
          />
          <Outlet />
        </>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    burger: state.ingredients,
    user: state.user,
  };
};

export default compose(connect(mapStateToProps), WithRouter)(Checkout);
