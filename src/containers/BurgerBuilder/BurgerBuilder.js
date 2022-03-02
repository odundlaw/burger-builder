import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Wrapper from "../../hoc/Wrapper/Wrapper";
import axios from "../../axios-orders";
import WithError from "../../hoc/WithError/WithError";
import WithLoading from "../../hoc/WithLoading/WithLoading";
import { compose } from "@reduxjs/toolkit";
import WithRouter from "../../hoc/Layout/WithRouter/WithRouter";
import { reduceIgObject } from "../../utils/utils";

const WithLoadingCompnent = WithLoading(OrderSummary);
const WithLoadingBurger = WithLoading(Burger);

const INGREDIENTS_PRICES = {
  salad: 0.3,
  cheese: 0.4,
  bacon: 0.5,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      laodingIngredients: false,
    };
  }

  componentDidMount() {
    const ingredients = this.props.location.state?.ingredients;
    const totalPrice = this.props.location.state?.totalPrice;
    if (ingredients) {
      return this.setState({
        ingredients: ingredients,
        totalPrice: +totalPrice,
        purchaseable: reduceIgObject(ingredients) > 0,
      });
    }
    this.setState({ laodingIngredients: true });
    axios
      .get("ingredients.json")
      .then((response) => {
        this.setState({
          ingredients: response.data,
          laodingIngredients: false,
        });
      })
      .catch((error) => {
        this.setState({ laodingIngredients: false });
      });
  }

  orderHandler = () => {
    this.state.purchaseable && this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const params = new URLSearchParams(this.state.ingredients);
    params.append("totalPrice", this.state.totalPrice);
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigate(`/checkout?${params.toString()}`, {
        state: {
          from: this.props.location,
          ingredients: this.state.ingredients,
        },
      });
    }, 3000)
  };

  updatePurchaseable = (ingredients) => {
    this.setState({ purchaseable: reduceIgObject(ingredients) > 0 });
  };

  addIngredientsHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };

    const oldIngredientCount = this.state.ingredients[type];
    const newIngredientCount = oldIngredientCount + 1;

    updatedIngredients[type] = newIngredientCount;

    const oldPriceTotal = this.state.totalPrice;
    const newPriceTotal = INGREDIENTS_PRICES[type] + oldPriceTotal;

    this.setState(
      {
        totalPrice: newPriceTotal,
        ingredients: updatedIngredients,
      },
      () => {
        this.updatePurchaseable(updatedIngredients);
      }
    );
  };

  removeIngredientsHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldIngredientCount = this.state.ingredients[type];

    if (oldIngredientCount <= 0) {
      return;
    }
    const newIngredientCount = oldIngredientCount - 1;

    updatedIngredients[type] = newIngredientCount;

    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice - INGREDIENTS_PRICES[type];

    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseable(updatedIngredients);
  };

  render() {
    console.log(this.props.location);
    let disableInfo;
    if (this.state.ingredients) {
      disableInfo = { ...this.state.ingredients };
      for (const key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
      }
    }

    let orderSummary = (
      <WithLoadingCompnent
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        isLoading={this.state.loading}
      />
    );
    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          clickBackdrop={this.purchaseCancelHandler}
        >
          {this.state.ingredients && orderSummary}
        </Modal>
        <WithLoadingBurger
          isLoading={this.state.laodingIngredients}
          ingredients={this.state.ingredients ? this.state.ingredients : {}}
        />
        {this.state.ingredients && (
          <BuildControls
            onAddIngredients={this.addIngredientsHandler}
            onRemoveIngredients={this.removeIngredientsHandler}
            disableInfo={disableInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            onOrder={this.orderHandler}
          />
        )}
      </Wrapper>
    );
  }
}

export default compose(WithRouter, WithError)(BurgerBuilder, axios);
