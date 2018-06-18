import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

//Array Controls
const controls = [
    {label: 'salad', type : 'salad'},
    {label: 'bacon', type : 'bacon'},
    {label: 'cheese', type : 'cheese'},
    {label: 'meat', type : 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>

        <p>Current Price: £{props.price.toFixed(2)}</p>

        {controls.map(ctrl => (
            <BuildControl 

                //Unique Key 
                key={ctrl.label} 
                
                //Unique Label For Each Button
                label={ctrl.label}
                
                /* 
                 - ES6 Function, On Click Execute The Ingredient Added And Delete Function                
                 - ingredientAdded and ingredientRemoved is passed in the BurgerBuilder.js, its just passing a reference to the method/function 
                */
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}

                //Less Than 0 Ingredients[type] its disabled
                disabled={props.disabled[ctrl.type]} 
            />
        ))}

        <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
        Order 
        </button>
    </div>    
)

export default buildControls;