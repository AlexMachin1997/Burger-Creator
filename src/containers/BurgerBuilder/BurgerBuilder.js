import React, {Component} from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary"; //Imports Aux Wrapper (Higher Order Function)
import Burger from "../../components/Burger/Burger"; //Imports Dynamic Ingredients
import BuildControls from "../../components/Burger/BuildControls/BuildControls"; //Imports Build Controls Component
import Modal from "../../components/UI/Modal/Modal"; //Imports Modal Component
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"; //Imports Order Summary Component
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"


//Inital Prices
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

//Stateful Component, Has Access To The States via This keyword Which Looks To The Class Then Looks At The States
class BurgerBuilder extends Component {

    //Inital States Of Application
    state = {
        ingredients : null, // Default Is Null (Empty)
        totalPrice : 3, //Total Price By Default Is 3
        purchasable: false, //Purchaseable False
        modalDisplay : false, //Modal Display Is False
        loading: false, //Loading Is False
        error: false //No Errors By Default
    }


    //Get Request To Firebase, Then Set Ingredients Object TO Response.data 
    componentDidMount () {

        axios.get("/ingredients.json")
          
        //After Sending A Request And The Response Is Recevied Update The Ingredient State From Null To The Responses Data
        .then(response => {
            this.setState({
                ingredients: response.data
            })
        })

        //Any Errors The Error State Is Set To True
        .catch (error => {
            this.setState({
                error: true
            })
        })
    }


    //Passing In The Updated Ingredients
    updatePurchaseState = (ingredients) => {


        //Maps through the Objecs (Ingredients), Passing In There igKey which is the ingredient key
        //The Key Is Then Returned And Then Reduced
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            
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

        //Subtract 1 From Old Count
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

    //When THe Method Is Referenced It Sets The Modal Display State To True
    modalToggleHandler = () => {
        this.setState({modalDisplay: true})
    }

    //Cancel Button Logic
    //On Click Of Cancel The Modal Wont Be Displayed
    modalCancelHandler = () => {
        this.setState({modalDisplay: false})
    }

    //Sending A Post Request Using The Axios Instance
    //.json Is Needed For THe Firebase Backend To Work
    modalContinueHandler = () => {
        
        //Triggers Load Icon Whilst The Data Gets Added
        this.setState({loading: true})

        //Dummy Javascript Object Which Then Gets Added To Firebase
        const order = {
            ingrdients: this.state.ingredients,
            price: this.state.totalPrice, //Recalculation Would Be Needed If The Ingrdients Were Stored On The Server 
            customer: {
                name: "Alex Machin",
                address: {
                    street: "Test 1",
                    postalCode: "TS1 3QE",
                    country: "United Kingdom"
                },
                email: "TEST@test.com"
            },
            deliveryMethd: "fastest"
        }

        //Posts Fake Server Data Via Axios.post(arg1,arg2)
        //.json is required for Firebase
        axios.post("/postorders.json", order)
        
            //Once the order has been Submitted set the load and modalDisplay to false
            .then(response=>{
                this.setState({loading: false, modalDisplay: false})
            })

            //Something Goes Wrong Then The Modlal And Lading Screen Are Set To False
            .catch(error => {
                console.log(error);
                this.setState({loading: false, modalDisplay: false});
            });
    }

    render() {

        //Label Logic

        //Copies Array Of Ingredients
        const disabledInfo ={
            ...this.state.ingredients
        };

        //Loops through ingredient, if there are no keys disable the less button
        //If there are keys there meaning ingrdients are present
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }  

        //Burger, Build Controls And Build Summary Logic
        
        //By Default The Order Summary Is Null, But When The Ingredients Dont Equal Null Then Show Then  Show Summary
        let orderSummary = null;

        //If The Ingredients Is Null Then Show Spinner, But If The Spinner Cant Be Shown Then Display The Text 
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        //If The Ingredients Isnt Null Then ...
        if(this.state.ingredients) {
           //Overwrites Burger Variable Declaration If The 
            burger =  (
                
                //Aux Is A HOC Wrapper Which Generates Child Elements
                <Aux>

                    <Burger 
                        ingredients={this.state.ingredients} //Shows Ingredeients (Logic In The Burger Functional Component)
                    > 
                    
                    </Burger>

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

            //If The Ingredients Arent Null Then The Order Summary Can Also Be Shown
            orderSummary = <OrderSummary 
                price = {this.state.totalPrice} //Allows The Total Price To Be Displayed
        
                ingredients={this.state.ingredients} // Displays The Ingrdienr
        
                purchaseCancelled={this.modalCancelHandler} //Cancel Button On Click Set The State To False, Meaning The Modal Will Go Away 
        
                purchasedContinued={this.modalContinueHandler} //Click Continue It Just Says Continue, But Firebase Method Will Be Added Here
            />        
        }
        
        //If THe State Isnt Null Then The Order Summary Becomes The Spinner Component
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
 
        return (
            //Aux Is The Div, Which Wraps The Child Elements And Renders Them On Screen
            <Aux>

                {/* 
                    Modal Component Component Which Renders Order Summary Inside Thanks To The Aux HOC
                    The Modal Is Shown Conditionally 
                    After Rendering The Modal Depending On The State Of The Ingrdients Then The Burger Object Wil Be Returned
                */}

                <Modal show={this.state.modalDisplay} modalClosed={this.modalCancelHandler}> 
                   
                    
                    {orderSummary}
                
                </Modal>
                
                {burger}
            
            </Aux>
        );
    }
}

//Needs two arguments the wrapper and axios as its required in the function
//Since The Contains Uses Error Handling For Axios Then The Second Argument Is Required
export default withErrorHandler(BurgerBuilder, axios);