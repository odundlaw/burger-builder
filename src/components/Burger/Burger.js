import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

import classes from './Burger.module.css';
import { reduceIgObject } from '../../utils/utils';

const Burger = props => {
    const ingredients = Object.keys(props.ingredients).map(igKeys => {
        return [...Array(props.ingredients[igKeys])].map((_, i) => {
            return <BurgerIngredients type={igKeys} key={props.ingredients[igKeys] + i} />
        })
    });
    const sum = reduceIgObject(props.ingredients)
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {props.ingredients && sum === 0 ? "No Ingredient, Start Adding" : ingredients }
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

Burger.propTypes = {
    ingredients: PropTypes.object.isRequired
}

export default Burger;
