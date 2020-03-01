import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const Burger = function(props) {
  let ingredients = props.ingredients.map((ingredient, index) => (
    <BurgerIngredient key={index} type={ingredient}></BurgerIngredient>
  ));

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="burger-top"></BurgerIngredient>
      {ingredients}
      <BurgerIngredient type="burger-bottom"></BurgerIngredient>
    </div>
  );
};

export default Burger;
