import React, { Component } from "react";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import swal from "@sweetalert/with-react";

import Button from "../../components/UI/Button/Button";
import Inputs from "../../components/UI/Inputs/Inputs";
import Spinner from "../../components/UI/Spinner/Spinner";

import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

import { auth, provider } from "../../redux/store/firebase";

import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";

import { setUser, unSetUser } from "../../redux/reducers/user";
import WithRouter from "../../hoc/Layout/WithRouter/WithRouter";

import classes from "./Auth.module.css";
import { checkValidity, toastConfigureObj } from "../../utils/utils";
import { toast } from "react-toastify";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      loginForm: {
        emailAddress: {
          inputType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Enter your Email Address",
          },
          value: "",
          validation: {
            required: true,
            validationMsg: "Email Address can't be Empty",
          },
          valid: false,
          touched: false,
        },
        password: {
          inputType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Enter your Password",
          },
          value: "",
          validation: {
            required: true,
            validationMsg: "Password Can't be Empty",
          },
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
      error: false,
      loading: false,
    };
  }

  componentDidMount() {
    const showNotificiation = this.props.searchParams.get("show");
    if (showNotificiation) {
      toast.success("You have signout Successfully!", toastConfigureObj);
    }
    const { checkAuth } = this.props.outletContext;
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (!this.props.user.isLoggedIn && user) {
        const { expirationTime } = user.stsTokenManager;
        const factoredExpiration = expirationTime - Date.parse(Date());
        this.props.setUser(
          user.displayName,
          user.email,
          user.stsTokenManager.accessToken,
          user.photoURL
        );
        checkAuth(factoredExpiration);
        localStorage.setItem("token", user.stsTokenManager.accessToken);
        localStorage.setItem("email", user.email);
        localStorage.setItem("expirationDate", new Date(expirationTime));
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signInWithGoogleHandler = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      swal(err.message, "Cancel to Continue!", "error", { button: "Cancel" });
    }
  };

  handleInputValueChangeHandler = (event, elementIdentifier) => {
    this.setState((prevState) => {
      let isValid = true;
      if (prevState.loginForm[elementIdentifier]["validation"]) {
        isValid =
          checkValidity(
            event.target.value,
            prevState.loginForm[elementIdentifier].validation
          ) && isValid;
      }
      const updatedForm = {
        ...prevState.loginForm,
        [elementIdentifier]: {
          ...prevState.loginForm[elementIdentifier],
          value: event.target.value,
          valid: isValid,
          touched: true,
        },
      };
      let formIsValid = true;
      for (const formInput in updatedForm) {
        formIsValid = formIsValid && updatedForm[formInput].valid;
      }
      return {
        ...prevState,
        loginForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  singInWithEmailAndPasswordHandler = async () => {
    const email = this.state.loginForm.emailAddress.value;
    const password = this.state.loginForm.password.value;
    try {
      this.setState({ loading: true });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      this.setState({ loading: false });
      swal(err.message, "Cancel to Continue!", "error", { button: "Cancel" });
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { Redirect, location } = this.props;
    if (this.props.user?.isLoggedIn) {
      const from = location.state?.from || "/";
      return (
        <Redirect
          to={from}
          state={{ showNotif: from === "/" ? true : false }}
        />
      );
    }
    const loginFormArray = [];
    for (const key in this.state.loginForm) {
      loginFormArray.push({ id: key, config: this.state.loginForm[key] });
    }
    let component = (
      <>
        {loginFormArray.map((loginForm) => {
          return (
            <Inputs
              key={loginForm.id}
              elementConfig={loginForm.config.elementConfig}
              inputType={loginForm.config.inputType}
              value={loginForm.config.value}
              inValid={!loginForm.config.valid}
              hasValidation={loginForm.config.validation}
              touched={loginForm.config.touched}
              changed={(event) =>
                this.handleInputValueChangeHandler(event, loginForm.id)
              }
            />
          );
        })}
        <Button
          btnType="Success"
          clicked={this.singInWithEmailAndPasswordHandler}
          disabled={!this.state.formIsValid}
        >
          Login <LoginOutlined />{" "}
        </Button>
        <button
          onClick={this.signInWithGoogleHandler}
          className={classes.googleSignInBtn}
        >
          Login With Gmail <GoogleOutlined />{" "}
        </button>
      </>
    );
    if (this.state.loading) {
      component = <Spinner />;
    }
    return (
      <div className={classes.Authentication}>
        <h4>Authentication (Login/Sign Up)</h4>
        <div className={classes.LoginFormWrapper}>{component}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({ setUser, unSetUser });

export default compose(
  connect(mapStateToProps, mapDispatchToProps()),
  WithRouter
)(Auth);
