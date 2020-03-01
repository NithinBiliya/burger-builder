import React from 'react';

import classes from './Order.module.css';

const Order = function(props) {
  return (
    <div className={classes.order}>
      <p>
        Ingredients :
        {props.ingredients.map((ingredient, index) => (
          <span
            key={index}
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px'
            }}
          >
            {ingredient}
          </span>
        ))}
      </p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
