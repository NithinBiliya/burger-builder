import React from 'react';
import Burger from '../../Burger/Burger/Burger';
import Button from '../../../shared/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = function(props) {
  return (
    <div className={classes['checkout-summary']}>
      <h1>Hope the burger tastes good!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.onCheckoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.onCheckoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
