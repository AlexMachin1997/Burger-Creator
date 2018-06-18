//Stateless Compoent - Just A Function With Some Logic

//Imports
import React, {Component} from "react"; //React JS So JSX Can Be Written
import classes from "./BurgerIngredients.css";
import propTypes from "prop-types";

//Function For Selecting Ingredients
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


//Exporting Function (ES6)
export default BurgerIngredient;