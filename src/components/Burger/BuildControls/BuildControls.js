/* 
Import Notes:
- React is needed well because its a react app, but it doesnt need to extend component as its a stateless component (JUST A FUNCTION)
- Classes is for CSS Module integration, usage: classes.ClassName e.g. BuildControls
- Build control are imported so the component can be used and allow the control to be used in the loop. 
*/

import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";


/* 
Control Array Notes:
- The array contains objects which is why the map function is allowed to be used
- The label is the key for the controls
*/

const controls = [
    {label: 'salad', type : 'salad'},
    {label: 'bacon', type : 'bacon'},
    {label: 'cheese', type : 'cheese'},
    {label: 'meat', type : 'meat'},
]


/* 
buildControl Method Notes:

- The method returns JSX which is wrapped in a wrapper defined in the CSS which is then scoped by webpack

- The first information which is present is the current price by default is 3 but as more ingredients get added the price increases becuase the state gets updated when ingredients are added or removed

- The controls array then gets looped through via the .map() 
    
    - The loops thorugh the state and returns the BuildControls component

    - Each control has a key which is the label name e.g. salad, bacon or meat (WILL ALWAYS BE UNIQUE)
        
    - Each control then gets a label, which is the key (How Convinient)

    - The Build control also passes in three props added, removed and disabled

    - added adds ingredients, it is passed into the BurgerBuilder container where the methods needed for the controls are created. The added prop then uses this.addIngredients(type){ Logic Goes Here }

        - removed removes ingredienets, it is also passed into the BurgerBuilder container where the methods needed for the controls are created. The removed prop then uses this.removeIngredient)(type) { Logic Goes Here }  

        - disabled props is disabled if the ingredientInfo[Key] (Copy Of Ingredients From Database) isnt greater than 0 then disable it, the logic can be seen below:
            for(let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }

    - Right at the end is the order button, depending if its greyed out or not will detemrine if the order can be placed or not. There must at least 1 ingreidnet at all for the order to be valid
*/

const buildControls = (props) => (
    <div className={classes.BuildControls}>

        {/* Price to two decimal places */}
        <p>Current Price: £{props.price.toFixed(2)}</p>

        {/* Looping Through the array of objects above */}
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

        {/* 
        Order Button Notes:
        - Disabled If The Ingredients Are Less Than 0 
        */}
        <button className={classes.OrderButton} //CSS Module which gets interpreted as a string e.g. OrderButton along with a unique number as its scoped locally to this component
            disabled={!props.purchasable} //BurgerBuilder state does 
            onClick={props.ordered} //Toggles model 
        >
        Order 
        </button>
    </div>    
)

export default buildControls;