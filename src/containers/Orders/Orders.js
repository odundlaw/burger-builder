import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithError from "../../hoc/WithError/WithError";
import WithLoading from "../../hoc/WithLoading/WithLoading";
import classes from "./Orders.module.css";

const OrderWithLoader = WithLoading(Order);

class Orders extends Component {
  state = {
    isLoading: true,
    orders: [],
  };
  componentDidMount() {
    axios
      .get("orders.json")
      .then((response) => {
        const fetchedOrders = [];
        for (const key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ isLoading: false, orders: fetchedOrders });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <div className={classes.Orders}>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          this.state.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              total={order.totalPrice}
            />
          ))
        )}
      </div>
    );
  }
}

export default WithError(Orders, axios);
