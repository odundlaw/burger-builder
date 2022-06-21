import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { auth } from "./redux/store/firebase";
import loadable from "@loadable/component";

import Layout from "./hoc/Layout/Layout";


import WithRouter from "./hoc/Layout/WithRouter/WithRouter";
import { unSetUser, setUser } from "./redux/reducers/user";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = loadable(() => import("./containers/Orders/Orders"));
const BurgerBuilder = loadable(() => import("./containers/BurgerBuilder/BurgerBuilder"));
const Checkout = loadable(() => import("./containers/checkout/Checkout"));
const ContactData = loadable(() => import("./containers/checkout/contactData/ContactData"));
const Auth = loadable(() => import("./containers/Auth/Auth"));


class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.signOut();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        this.signOut();
      } else {
        const email = localStorage.getItem("email");
        const displayName = "";
        if (!this.props.user.isLoggedIn) {
          this.props.setUser(displayName, email, token, "");
        }
        const factoredExpiration = expirationDate - new Date();
        this.checkAuthSignOut(factoredExpiration);
      }
    }
  }

  checkAuthSignOut = (expirationTime) => {
    setTimeout(() => {
      this.signOut();
    }, expirationTime);
  };

  signOut = async () => {
    await auth.signOut();
    this.props.unSetUser();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expirationDate");
    return this.props.navigate("/auth?show=true");
  };

  render() {
    return (
      <div>
        <Routes>
          <Route
            element={
              <Layout
                user={this.props.user}
                signOut={this.signOut}
                checkAuth={this.checkAuthSignOut}
              />
            }
          >
            <Route path="/" element={<BurgerBuilder />} />
            <Route path="/checkout" element={<Checkout />}>
              <Route path="/checkout/contact-data" element={<ContactData />} />
            </Route>
            <Route path="/orders" element={<Orders />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center" }}>
                {" "}
                <h1>404 Page Not Found </h1>
              </div>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({
  unSetUser,
  setUser,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps()),
  WithRouter
)(App);
