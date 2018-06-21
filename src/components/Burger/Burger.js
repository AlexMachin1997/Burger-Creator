/* 
Import Notes:
- Importing react so the stateless component can receive props
- Import Burger.css so CSS modules can be used
- Imports BurgerIngredients component so the burger can receive te ingredients 
*/
import React from "react";
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

/* 
Burger Notes:
- Creates a blank array named transformedIngredients
- Then the igKey (igKey e.g. Bacon) is looped through and added to the transformedIngredients array 
- The new array is then returned between the breaded top and bottom in the JSX 
*/
const burger = (props) => {

    //Holds the BurgerIngredient components.  
    let transformedIngredients = [];

    for (const ingKey in props.ingredients) {
        for (let i = 0; i < props.ingredients[ingKey]; i++) {
            transformedIngredients.push(<BurgerIngredients key={ingKey + i} type={ingKey} />);
        }
    }

    //Array less than 0 then ......
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Come on treat Yourself to a Mcdonalds</p>;
    }
    
    //Returns breaded-top and breaded-bottom, in between the array of ingredients is returned
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
                {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;