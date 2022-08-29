import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({user, signOut}) => {

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/"> Burger Builder </NavigationItem>
      <NavigationItem link="/orders"> Orders </NavigationItem>
      {user?.isLoggedIn ? (
        <button className={classes.NavigatinItemBtn} onClick={signOut}>
          Sign Out{" "}
        </button>
      ) : (
        <NavigationItem link="/auth"> Authentication </NavigationItem>
      )}
      {user?.isLoggedIn && user?.profileUrl && (
        <div className={classes.NavigationItemImg}>
          <img src={user.profileUrl} alt={user.displayName} />
        </div>
      )}
    </ul>
  );
};

export default NavigationItems;
