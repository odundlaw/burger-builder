import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Wrapper from "../../hoc/Wrapper/Wrapper";
import WithError from "../../hoc/WithError/WithError";
import WithLoading from "../../hoc/WithLoading/WithLoading";
import { compose } from "@reduxjs/toolkit";
import WithRouter from "../../hoc/Layout/WithRouter/WithRouter";
import { reduceIgObject, toastConfigureObj } from "../../utils/utils";
import {
  addIngredients,
  removeIngredients,
  fetchIngredients,
} from "../../redux/reducers/ingredients";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import { cancelToken, setCancelToken } from "../../axios-orders";
import axios from "axios";

const WithLoadingCompnent = WithLoading(OrderSummary);
const WithLoadingBurger = WithLoading(Burger);

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      purchaseable: false,
      purchasing: false,
      loading: false,
      laodingIngredients: false,
    };
  }

  async componentDidMount() {
    if (this.props.user.isLoggedIn && this.props.location.state?.showNotif) {
      toast.success("SignIn Successfully!", toastConfigureObj);
    }
    const { isMounted } = this.props;
    if (!this.props.burger.ingredients) {
      try {
        const newToken = axios.CancelToken.source();
        setCancelToken(newToken);
        this.setState({ laodingIngredients: true });
        await this.props.fetchIngredients().unwrap();
      } catch (err) {
        //console.log(err);
      } finally {
        isMounted?.current && this.setState({ laodingIngredients: false });
      }
    }
  }

  componentWillUnmount() {
    //console.log("Cancelling Subscription...", this.mounted);
    cancelToken.cancel("Axios Token cancelled from here");
    this.mounted = false;
  }

  orderHandler = () => {
    this.updatePurchaseable(this.props.burger.ingredients) &&
      this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigate("/checkout");
    }, 3000);
  };

  updatePurchaseable = (ingredients) => {
    return reduceIgObject(ingredients) > 0;
  };

  render() {
    const { ingredients, totalPrice } = this.props.burger;
    let disableInfo;
    if (ingredients) {
      disableInfo = { ...ingredients };
      for (const key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
      }
    }

    let orderSummary = (
      <WithLoadingCompnent
        ingredients={ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={totalPrice}
        isLoading={this.state.loading}
      />
    );

    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          clickBackdrop={this.purchaseCancelHandler}
        >
          {ingredients && orderSummary}
        </Modal>
        <WithLoadingBurger
          isLoading={this.state.laodingIngredients}
          ingredients={ingredients ? ingredients : {}}
        />
        {ingredients && (
          <BuildControls
            onAddIngredients={this.props.addIngredients}
            onRemoveIngredients={this.props.removeIngredients}
            disableInfo={disableInfo}
            price={totalPrice}
            purchaseable={this.updatePurchaseable(ingredients)}
            onOrder={this.orderHandler}
          />
        )}
      </Wrapper>
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
  addIngredients,
  removeIngredients,
  fetchIngredients,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps()),
  WithRouter,
  WithError
)(BurgerBuilder, axios);
