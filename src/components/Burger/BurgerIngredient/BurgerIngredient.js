import React from 'react';

import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const BurgerIngredient = function(props) {
  let ingredient = null;

  switch (props.type) {
    case 'burger-top':
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={classes.Meat}></div>;
      break;
    case 'cheese':
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case 'salad':
      ingredient = <div className={classes.Salad}></div>;
      break;
    case 'bacon':
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case 'burger-bottom':
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
