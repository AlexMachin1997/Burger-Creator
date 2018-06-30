import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    //Placeholder States
    state = {
        ingredients: null,
        price: 0
    }

    /*
    componentDidMount (Render) Notes:
    - On render get the search params defined in the burgerBuilder add function
    - After then create a blank object named ingrdients
    - Loop through the query entires as there could be more than 1 ingredients
    - Set the blank array equal to params first element
    - Fianlly set the ingredients array to the URL Query 
    */
    componentWillMount() {
      
        const query = new URLSearchParams(this.props.location.search);
      
        const ingredients = {};
      
        let price = 0;

        //WILL BE REPLACE WITH REDUX Bascially current the price is passed in to the URL
        for(let param of query.entries()) {
            if( param[0]=== "price") {
                price = param[1];
            } else {
                //["sald","1"]
                ingredients[param[0]] = +param[1]; 
            }
        }

        this.setState({
            ingredients : ingredients,
            totalPrice : price
        })
    }

    /*
    checkoutCancelled Notes:
    - Goes back a stack, pushes the component back and shows this one instead
    - history.goBack() can be access because of the react-router & react-router-dom
    */
    checkoutCancelled = () => {
        this.props.history.goBack();
    }


    /*
    checkoutContinued Notes:
    - Displays form via the replace function, which can be used because of react-router & react-router-dom
    - The function pushes the component on top of the stack
    */
    
    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    }


    render() {

        return (
            <div>
                {/* 
                Checkout Summary Notes:
                - The state is passed in so the current state can be accessed
                - Two methods are then passed in checkoutCancelled & checkoutContinued
                - The two methods can be access in the CheckoutSummary component via this.props or props depending on if its stateful or less
                - The methods are assigned to the two buttons continue and cancel
                - The cancel button goes back a stack
                - The continue button goes to the ContactData component
                
                    Continue Button Notes:
                    - To get to the ContaactData component the path is defined below  (LAST SECTION BEFORE CLOSING THE </div>)
                    - On click of the button the contact-data component is rendered (Form With Data - Needs Finishing)
                    - When the button is clicked the component is pushed on top of the stack

                    Cancel Button Notes:
                    - Goes back a stack to put another component on top e.g. going from ContactData to Checkout 
                    - This is all it currently does

                */}
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued}                     
                />



                {/*
                Route Notes:
                - the path is  localhost:3000/checkout/contact-data
                - The route loads ContactData component
                - When the route is loaded the state of ingredients and total price is passed in 
                - The states are fetched via the URL encoding
                - The states can then be accessed via props in the ContactData component, the data is being passed up flow
                - The ingredients and total price are then used in the ContactData component            
                */}

                <Route path={this.props.match.path + "/contact-data"} 
                       render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />                
            </div>  
        )
    }
}


export default Checkout;

