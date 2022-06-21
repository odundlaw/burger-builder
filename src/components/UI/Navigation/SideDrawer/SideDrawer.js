import React from 'react';
import Backdrop  from '../../Backdrop/Backdrop';
import Wrapper from "../../../../hoc/Wrapper/Wrapper";
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
    let assignedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) assignedClasses = [classes.SideDrawer, classes.Open]
    return (
      <Wrapper>
        <Backdrop show={props.open} backdropClick={props.closed} />
        <div className={assignedClasses.join(' ')} onClick={props.closed}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </Wrapper>
    );
}

export default SideDrawer
