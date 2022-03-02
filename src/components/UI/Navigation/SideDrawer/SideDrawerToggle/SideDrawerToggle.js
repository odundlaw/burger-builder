import React from 'react';

import classes from './SideDrawerToggle.module.css';

const SideDrawerToggle = (props) => {
    return (
      <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
}

export default SideDrawerToggle
