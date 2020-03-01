import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../../shared/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const SideDrawer = function(props) {
  const sideDrawerClasses = [classes['side-drawer']];
  if (props.open) {
    sideDrawerClasses.push(classes.open);
  } else {
    sideDrawerClasses.push(classes.close);
  }

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={sideDrawerClasses.join(' ')}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
