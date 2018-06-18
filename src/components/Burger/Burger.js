import React from "react";
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {

    //Long Way And Hard To Follow Way 

    //Converts Props from objectects to array so the map function can be used
    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         Copy and create a new array via the array method()
    //         Map/Loop through the array assigning each of the values a igKey (Ingredient Key)
    //         key={igKey + 1} genrates a random key e.g .Salad12345
    //         type = {igKey} e.g. Salad
    //         igKey is the key which is salad or meat
    //         return [...Array(props.ingredients[igKey])].map((_,i) => {
    //             console.log(BurgerIngredients)
    //             return <BurgerIngredients key={igKey + i} type={igKey} />
    //         });
    //     });

  
    //Easier To Understand Way

    //Declare an ingredients array that will hold the BurgerIngredient components.  
    let transformedIngredients = [];
    
    // Loop through every key in the props.ingredients object
    for (const ingKey in props.ingredients) {
        /*
        For every key, use a for loop that iterates as many times as the value
        contained in each key. For every iteration, add a BurgerIngredient to the
        ingredients array.
        */
        for (let i = 0; i < props.ingredients[ingKey]; i++) {
            transformedIngredients.push(<BurgerIngredients key={ingKey + i} type={ingKey} />);
        }
    }

    //If the array is empty, meaning no ingredients sleected then display the following errors
    if (transformedIngredients.length === 0) {
    
        transformedIngredients = <p>Come on treat Yourself to a Mcdonalds</p>;
    }
    
    return (
        //JSX Wrapper For Styling 
        <div className={classes.Burger}>

            {/*
                - Generates Breaded Top And Bottom
                - Returns The Array Of Ingredients
            
            */}
            <BurgerIngredients type="bread-top" />
                {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        
        </div>
    );
};

export default burger;