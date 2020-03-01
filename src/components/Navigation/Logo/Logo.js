import React from 'react';

import BurgerLogo from '../../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = function() {
  return (
    <div className={classes.logo}>
      <img src={BurgerLogo} alt="My Burger Logo" />
    </div>
  );
};

export default Logo;
