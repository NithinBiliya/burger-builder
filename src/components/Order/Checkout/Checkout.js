import React, { Component } from 'react';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    let ingredients = params.getAll('ingredients');
    let totalPrice = params.getAll('totalPrice');
    if (ingredients && ingredients[0]) {
      ingredients = ingredients[0].split(',');
    } else {
      ingredients = [];
    }
    if (totalPrice && totalPrice[0]) {
      totalPrice = totalPrice[0];
    } else {
      totalPrice = 0;
    }

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
