import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = function(props) {
  return (
    <ul className={classes['navigation-items']}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
