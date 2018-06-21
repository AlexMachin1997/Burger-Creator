/* 
Imports Notice
- Imports react with its component to make it a staeful component, this adds lifecycle model methods
- Imports the higer order function, auxiliary component for wrapping purposes
- Imports button component from the UI components section
*/

import React, {Component} from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";


/* 
OrderSummary Notice:
- Inline styling is created, capitalizes something
- Loops through the object keys and returns a dynamic list which is then returned to print out the list
- Each li has a key which is the igKey, the inline style is applied and key is printed out to form the label
- Total price is displayed to two decimal places
- The button component is then used to produce the cancel and continue button 
    - Each button as a type to dynamcially add the styling defined in the Button component 
    - Each button also has a clicked prop, this is then passed into the BurgerBuilder where the order summary component is used
    - The buttons then referenced the modalContinueHandler and modalCancelHandler
*/

class OrderSummary extends Component {

    
    componentWillUpdate() {
        console.log("[OrderSummary.js] Component Updated ");
    }
    
    render () {

        //Inline Styles
        const styles = {
            textTransform : "capitalize"
        }

        //Goes through each ingrdients object key (States Is Created Via An Object) and print out a dynamic list
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
     
            // JSX Returns A List Item With The Ingredient Key (igKey) - NEEDS A KEY OTHERWISE REACT WILL GIVE YOU AN ERROR IN THE CONSOLE
            //Along With The igKey been Outputed e.g. Salad, Which Is Between The Span Tag For Styling Purposes 
            //After The Ingredient Key Is Printed Out (Salad) The Numer Of The Item Is Then Outpute
            //Output Example - <li> Salad: 1 </li>
          
            return (
                <li key={igKey}>
                    <span style={styles}> {igKey} : </span> 
                    {this.props.ingredients[igKey]} 
                </li>
            ) 
        });

        return (
            <Aux> 
                <h3> Your Order </h3>
                
                <p> A declicious burger with the following ingredients</p>
                

                {/* 
                
                Based On Number Of Ingredients Added, An Example Is Below:

                <ul>
                    <li> Bacon : 1 </li>
                    <li> Cheese : 0 </li>
                    <li> Salad : 1 </li>

                </ul>
        
                */}
                <ul> 
                    {ingredientSummary}
                </ul>           
                
                {}
                <p> Total Price: £{this.props.price.toFixed(2)} </p>
                
                <p> Continue To Checkout?? </p> 
                
                <Button 
                    btnType="Danger" 
                    clicked={this.props.purchaseCancelled}
                > 
                Cancel 
                </Button>
                
                <Button 
                    btnType="Success" 
                    clicked={this.props.purchasedContinued}> 
                    Continue 
                </Button>
            </Aux>
        )
    }
}

export default OrderSummary