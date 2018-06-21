/* 
Import Notes: 
- Import react component to turn it in a statefull component
- Import the higher order component AUX, it will be the wrapper it generates the children props (ANYTHING IN BETWEEN)
- Imports Burgers (Ingredients)
- Imports the burger controls (Labels, Buttons)
- Import Modal to show the OrderSummary, which is why the OrderSummary is imported
- Imports a custom axios custom instance which imports axios and has a base URL from the Firebase URL. Now the Post URL just needs to be /post-order.json
- Import Spinner so when the ingredients are being fetched and the orders are submitted the spinner wil show
- Import withErrorHandler o handle axios errors
*/

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


/* 
Burger Builder Note:
- The inital states are set :
    - ingredients is null by default (No Ingredients At Start), but when additional ingredients are added its updated
    - totalPrice is just the default price without any additional ingredients
    - purchaseable is if the order component can be clicked or not
    - modalDisplay is if the modal can be displayed or not, depends on the order button state
    - loading, if something is being fetched or processed then show spinner else dont display. 
    - error state for display errors e.g. ingredients cant be displayed

- componentDidMount() 
    - fetches the ingredietns and sets the response of the ingredients from null to whatever the response data is
    - Any errors error is set to true

- updatePurchaseState() 
    - Loops through the object via map
    - Returns the igKey from each loop
    - Reduces it 
    - If its greater tahn 0 then set the purchaseale to true, else dont allow orders to be processed

- addIngredientsHandler() & removeIngredientsHandler Notes
    - Fetches old ingredient count
    - Updates it by adding 1
    - Copies old state 
    - Set old amount equal to the new count 
    - Fetch prices
    - Old + new price
    - Set state - total price is set to the new price and set the ingredients equal to updated ingredients
    - Then use the updatePurchase() and pass in the new ingreidnets so the price can be adjusted
    - Same process for removing but instead of adding its - 1

- modalToggleHandler() 
    - Sets the state to true

- modalCancelHandler() 
    - Sets the state back to false, it closes the modal

- modalContinueHandler()

- Render method is called and JSX is returned
*/
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
   

        //Empty Array
        const queryParams = [];
      
        //Go through the current state of ingredients and set the URL to whatever the current ingredient state is.
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }

        //For each string in the array the yare joine together by a & sign.
        //queryString is then passed into the next stack which is checkout, this allows data to be intercepted


        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join("&");
        
        //Pushes The Checkout Component Onto The Stack
        console.log(this.props);
        this.props.history.push({
            pathname: "checkout",
            search: "?" + queryString
        })
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
                    {/*Shows Ingredeients (Logic In The Burger Functional Component*/}
                    <Burger ingredients={this.state.ingredients}/> 
                    
                    <BuildControls
                       ingredientAdded={this.addIngredientHandler} //Reference To The Add Ingrdient Method Above
        
                       ingredientRemoved={this.deleteIngredientHandler} // Reference To The Delete Ingredient Method Above
        
                       price={this.state.totalPrice} //References The Total Price Which Gets Updated On Click Of The Add Ingrdient Button Aswell As The Delete Button
        
                       disabled={disabledInfo} //Disabled prop passing the disabledInfo Object
        
                       purchasable={this.state.purchasable} //Order Button Active Or Not
        
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