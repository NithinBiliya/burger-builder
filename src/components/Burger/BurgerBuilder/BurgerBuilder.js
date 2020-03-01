import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import BuildControls from '../BuildControls/BuildControls';
import INGREDIENT_TYPES from '../../../shared/ingredientTypes';
import Modal from '../../../shared/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../../shared/Spinner/Spinner';
import WithErrorHandler from '../../../shared/WithErrorHandler/WithErrorHandler';

import axios from '../../../shared/axios-orders';

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 40,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        const ingredients = response.data ? response.data : [];
        let totalPrice = this.state.totalPrice;
        ingredients.forEach(
          ingredient => (totalPrice += INGREDIENT_TYPES[ingredient].price)
        );
        this.setState({
          ingredients: ingredients,
          totalPrice: totalPrice
        });
      })
      .catch(error => this.setState({ error: true }));
  }

  updatePurchasable(ingredients) {
    this.setState({ purchasable: ingredients.length > 0 });
  }

  addIngredientHandler = type => {
    if (!INGREDIENT_TYPES[type]) {
      throw Error('Invalid ingredient');
    }
    const newIngredients = [
      ...this.state.ingredients,
      INGREDIENT_TYPES[type].type
    ];
    this.setState({
      ingredients: newIngredients,
      totalPrice: this.state.totalPrice + INGREDIENT_TYPES[type].price
    });
    this.updatePurchasable(newIngredients);
  };

  removeIngredientHandler = type => {
    if (!INGREDIENT_TYPES[type]) {
      throw Error('Invalid ingredient');
    }
    const ingredientIndex = this.state.ingredients.lastIndexOf(type);
    if (ingredientIndex === -1) {
      console.warn(`Ingredient ${type} not present`);
      return;
    }
    const newIngredients = [...this.state.ingredients];
    newIngredients.splice(ingredientIndex, 1);
    this.setState({
      ingredients: newIngredients,
      totalPrice: this.state.totalPrice - INGREDIENT_TYPES[type].price
    });
    this.updatePurchasable(newIngredients);
  };

  updatePurchasing = purchasing => {
    this.setState({ purchasing: purchasing });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout',
      search:
        '?ingredients=' +
        this.state.ingredients.join(',') +
        '&totalPrice=' +
        this.state.totalPrice
    });
  };

  render() {
    let orderSummary = null;
    let burger = this.state.error ? (
      'Ingridients could not be loaded'
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      const disabledInfo = { ...INGREDIENT_TYPES };
      Object.keys(disabledInfo).forEach(key => {
        disabledInfo[key] =
          this.state.ingredients.find(element => element === key) === undefined;
      });
      burger = (
        <>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={() => this.updatePurchasing(true)}
          ></BuildControls>
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={() => this.updatePurchasing(false)}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.updatePurchasing(false)}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
