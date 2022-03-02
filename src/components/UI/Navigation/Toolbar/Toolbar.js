import React from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideDrawerToggle from "../SideDrawer/SideDrawerToggle/SideDrawerToggle";

import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <SideDrawerToggle clicked={props.hanburgerClicked} />
      <div className={classes.Logo}><Logo /></div>
      <nav className={classes.DesktopOnly}>
          <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
