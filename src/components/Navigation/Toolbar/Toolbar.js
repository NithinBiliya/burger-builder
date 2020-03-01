import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

import classes from './Toolbar.module.css';

const Toolbar = function(props) {
  return (
    <header className={classes.toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={classes['desktop-only']}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
