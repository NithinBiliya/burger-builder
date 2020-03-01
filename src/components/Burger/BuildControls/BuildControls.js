import React from 'react';
import INGREDIENT_TYPES from '../../../shared/ingredientTypes';

import classes from './BuildControls.module.css';
import BuildControl from '../BuildControl/BuildControl';

const BuildControls = function(props) {
  return (
    <div className={classes['build-controls']}>
      <p>
        Total price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {Object.keys(INGREDIENT_TYPES).map(key => (
        <BuildControl
          key={key}
          label={INGREDIENT_TYPES[key].label}
          added={() => {
            props.ingredientAdded(INGREDIENT_TYPES[key].type);
          }}
          removed={() => {
            props.ingredientRemoved(INGREDIENT_TYPES[key].type);
          }}
          disabled={props.disabled[INGREDIENT_TYPES[key].type]}
        ></BuildControl>
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
