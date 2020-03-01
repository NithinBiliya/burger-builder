import React from 'react';
import Button from '../../../shared/Button/Button';

const OrderSummary = function(props) {
  const ingredientCounts = {};
  for (let i = 0; i < props.ingredients.length; i++) {
    ingredientCounts[props.ingredients[i]] = ingredientCounts[
      props.ingredients[i]
    ]
      ? ingredientCounts[props.ingredients[i]] + 1
      : 1;
  }

  return (
    <>
      <h3>Your Order :</h3>
      <p>A delicious burger with the following ingredients :</p>
      <ul>
        {Object.keys(ingredientCounts).map(ingredient => (
          <li key={ingredient}>
            <span style={{ textTransform: 'capitalize' }}>{ingredient}</span> :{' '}
            {ingredientCounts[ingredient]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
