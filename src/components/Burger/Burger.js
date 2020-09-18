import React from 'react'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [... Array(props.ingredients[igKey])]
        .map((_, index)=>{
            return <BurgerIngredient key={igKey+index } type={igKey}></BurgerIngredient>
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])
   if(transformIngredients.length === 0){
    transformIngredients = <p>Please add ingredients !</p>
   }
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;