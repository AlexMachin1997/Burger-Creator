import React, {Component} from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary"; //Imports Aux Wrapper (Higher Order Function)
import Burger from "../../components/Burger/Burger"; //Imports Dynamic Ingredients
import BuildControls from "../../components/Burger/BuildControls/BuildControls"; //Imports Build Controls Component
import Modal from "../../components/UI/Modal/Modal"; //Imports Modal Component
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"; //Imports Order Summary Component

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

//Stateful Component, Has Access To The States via This keyword Which Looks Tt The Class Then Looks At The States
class BurgerBuilder extends Component {

    //This Would Overwrite Reacts Default Settings
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    //Inital States Of Application
    state = {
        ingredients : { 
            salad: 0,
            bacon:0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        purchasable: false,
        modalDisplay : false
    }

    //Passing In The Updated Ingredients
    updatePurchaseState = (ingredients) => {


        //Maps through the Objecs (Ingredients), Passing In There igKey which is the ingredient key
        //The Key Is Then Returned And Then Reduced
        const sum = Object.keys(ingredients).map(igKey => {
                return ingredients[igKey]
            })
            
            //
            .reduce((sum,el) => {
                return sum + el;
            }, 0);
         
            //When The Sum Of The Ingredients Is Greater Than 0 Then Set To True
            //The Order Button Will Be Avaliable
            this.setState({purchasable: sum > 0});
     }

    //Adding Additional Ingredients
    //Type Referes To The Switch 
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; //Fetch Old Ingredient Count 
        const updatedCount= oldCount + 1; // Old Count + 1 (New Count)
        
        //Copy Via Spread(...) To Safely Mutate The State
        const updatedIngredient = {
            ...this.state.ingredients
        };
        

        updatedIngredient[type] = updatedCount; //Set Amount Of Ingredients Equal To Updated Count
        const priceAddition = INGREDIENT_PRICES[type]; //Fetches Price From Variable Above

        const  oldPrice = this.state.totalPrice; //Fetch Old Price
        const newPrice = oldPrice + priceAddition; //Old Price + New Price 

        //Set The Old Price To The New Price + Set The Ingredients To The Updated Ingrdients
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredient
        })
        
        //Update The Purchase Status, It Needs To Recieve The Updated Ingredients
        this.updatePurchaseState(updatedIngredient); 
    }

    //Removing Additional Ingredients
    //Type Referes To The Switch 
    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; //Fetch Old Ingrdient Count 
        if(oldCount <= 0) {
            return; //Returns Nothing
        }
        const updatedCount= oldCount - 1; // OldCount - 1
        //Copy Via Spread(...) To Safely Mutate The State
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount; //Set UpdatedIngredient Amount to the updated count 
        
        const priceDeducation = INGREDIENT_PRICES[type]; // Gets The Prices For The Burger Ingredients
        const  oldPrice = this.state.totalPrice; //Gets The Total Price
        const newPrice = oldPrice - priceDeducation; //Old Price - Price Decuation 

        //Set The Old Price To The New Price + Set The Ingredients To The Updated Ingrdients
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredient
        })
       
        //Update The Purchase Status, It Needs To Recieve The Updated Ingredients
        this.updatePurchaseState(updatedIngredient); 

    }

    //Order But Logic, 
    modalToggleHandler = () => {
        this.setState({modalDisplay: true})

    }

    //Cancel Button Logic
    modalCancelHandler = () => {
        this.setState({modalDisplay: false})
    }

    //Alert, But Firebase Logic Will Go Here
    modalContinueHandler = () => {
     alert("You Continued");   
    }

    render() {

        //Copies Array Of Ingredients
        const disabledInfo ={
            ...this.state.ingredients
        };

        //Loops through ingredient, if there are no keys disable the less button
        //If there are keys there meaning ingrdients are present
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            //Aux Is The Div, Which Wraps The Child Elements And Renders Them On Screen
            <Aux>

                <Modal show={   this.state.modalDisplay} modalClosed={this.modalCancelHandler}> 
                    <OrderSummary 
                        price = {this.state.totalPrice} //Allows The Total Price To Be Displayed

                        ingredients={this.state.ingredients} // Displays The Ingrdienr

                        purchaseCancelled={this.modalCancelHandler} //Cancel Button On Click Set The State To False, Meaning The Modal Will Go Away 

                        purchasedContinued={this.modalContinueHandler} //Click Continue It Just Says Continue, But Firebase Method Will Be Added Here
                    />
                </Modal>

                {/*
                 Burger ingredients set to the states defined above
                 The ingreditns get 
                */}

                <Burger ingredients={this.state.ingredients}/>
                
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} //Reference To The Add Ingrdient Method Above

                    ingredientRemoved={this.deleteIngredientHandler} // Reference To The Delete Ingredient Method Above

                    price={this.state.totalPrice} //References The Total Price Which Gets Updated On Click Of The Add Ingrdient Button Aswell As The Delete Button

                    disabled={disabledInfo} //Disabled prop passing the disabledInfo Object

                    purchasable={this.state.purchasable} //Order Button Active Or Note

                    ordered={this.modalToggleHandler} //Order Button Prop Which Passes A Reference To The Modal Toggler
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;