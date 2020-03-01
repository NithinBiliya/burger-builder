import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = function(props) {
  return (
    <li className={classes['navigation-item']}>
      <NavLink
        activeClassName={classes.active}
        to={props.link}
        exact={props.exact}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
