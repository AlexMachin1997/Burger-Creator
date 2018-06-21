/* 
Imports Notice

- Imports component from react so the component can be a stateful component, meaning propType validation can be used

- Imports BurgerIngredients.css for CSS modules

- propTypes is imported to allow the props to be validated e.g. :
    BurgerIngredient.propTypes = {
        type: propTypes.string.isRequired
    }

*/

import React, {Component} from "react"; //React JS So JSX Can Be Written
import classes from "./BurgerIngredients.css";
import propTypes from "prop-types";


/* 
BurgerIngredient Class Notes:
- By default the ingredients are null
- Switch statement which decides which ingrdients to add
    - The burger contains a bread top and bread bottom, as you would epxect from a burger.
    - In between the bread there are various toppings all which get conditionallty applied
        - Meat
        - Cheese
        - Salad
        - Bacon 
    - When a burger gets added
*/

class BurgerIngredient extends Component {
    render(){
        let ingredient = null;

        //JavaScript Switch - Analyse Type Of Ingredient
        //Referes To The Classes Defined In BurgerIngredients.css
        switch(this.props.type) {
        
            //Bread Top Case 
            case('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}> </div>
                        <div className={classes.Seeds2}> </div>
                    </div>
                );
                break;
     
            //Bread Bottom Case
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}> </div>;
                break;
            
            //Meat Case
            case ('meat'):
                ingredient = <div className={classes.Meat}> </div>
                break;
            
            //Cheese Case 
            case ('cheese'):
                ingredient = <div className={classes.Cheese}> </div>
                break;
    
            //Salad Case
            case ('salad'):
                ingredient = <div className={classes.Salad}> </div>
                break;
    
            //Bacon Case
            case('bacon'):
                ingredient = <div className={classes.Bacon}> </div>
                break;
    
            //Default Case - Wrong Input Case Mostly
            default:
                //Inredient Will Be Set To Null
                ingredient = null;
            }
            return ingredient;
        };
    }   

    //Must Be A String From The Switch And Its Required
    BurgerIngredient.propTypes = {
        type: propTypes.string.isRequired
    }


export default BurgerIngredient;