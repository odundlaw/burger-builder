import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { cancelToken, setCancelToken } from "../../axios-orders";

import { fetchOrders, deletSingleOrder } from "../../redux/reducers/orders";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithError from "../../hoc/WithError/WithError";
/* import WithLoading from "../../hoc/WithLoading/WithLoading"; */
import classes from "./Orders.module.css";
import WithRouter from "../../hoc/Layout/WithRouter/WithRouter";

/* const OrderWithLoader = WithLoading(Order); */

import { toast } from "react-toastify";
import { sortArray, toastConfigureObj } from "../../utils/utils";

class Orders extends Component {
  state = {
    isLoading: true,
  };
  async componentDidMount() {
    const { isLoggedIn, accessToken, email } = this.props.user;
    const { isMounted } = this.props;
    const newToken = axios.CancelToken.source();
    setCancelToken(newToken);
    if (isLoggedIn) {
      try {
        await this.props.fetchOrders({ accessToken, email }).unwrap();
        isMounted?.current && this.setState({ isLoading: false });
      } catch (err) {
        //console.log(err);
      } finally {
        isMounted?.current && this.setState({ isLoading: false });
      }
    }
  }

  componentWillUnmount() {
    cancelToken && cancelToken.cancel();
  }

  deleteOrderHandler = async (id) => {
    //console.log("deleting");
    const { accessToken } = this.props.user;
    const { deletSingleOrder } = this.props;
    try {
      await deletSingleOrder({ orderId: id, accessToken }).unwrap();
      toast.success("Order Deleted Successfully!", toastConfigureObj);
    } catch (err) {
      //console.log(err);
    }
  };

  render() {
    const { isLoggedIn } = this.props.user;
    const { Redirect, location, orders } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/auth" state={{ from: location.pathname }} />;
    }
    const sortedArray = sortArray(orders);
    return (
      <div className={classes.Orders}>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          sortedArray.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              total={order.totalPrice}
              timeAgo={order.date}
              id={order.id}
              deleteOrder={() => this.deleteOrderHandler(order.id)}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orderItems,
  user: state.user,
});

const mapDispatchToProps = () => ({ fetchOrders, deletSingleOrder });

export default compose(
  connect(mapStateToProps, mapDispatchToProps()),
  WithRouter,
  WithError
)(Orders, axios);
