import React, { Component } from "react";

import Wrapper from "../Wrapper/Wrapper";
import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.css";
import { Outlet } from "react-router";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSidedrawer: false });
  };

  sideToggleHandler = () => {
    this.setState((state) => {
      return { showSidedrawer: !state.showSidedrawer };
    });
  };
  render() {
    return (
      <Wrapper>
        <Toolbar hanburgerClicked={this.sideToggleHandler} />
        <SideDrawer
          open={this.state.showSidedrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}><Outlet /></main>
      </Wrapper>
    );
  }
}

export default Layout;
