import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components//UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {


    //Configuration for the input fields
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Postcode"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 7,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '', //NEEDS TO BE FIXED
                validatation: {},
                valid : true //Needs to always be true as there are currently rules set for the drop
            }
        },
        loading: false,
        formIsValid: false 
    }


    orderHandler = (event) => {
        event.preventDefault();

        //When this component is rendered it passes in the ingredients and total prices.
        //To show the props have been passed in they are console logged elow
        console.log(this.props.ingredients);
        console.log(this.props.price);

        this.setState({ loading: true })

        //Blank object which will store the forms details
        const formData = {}

        //Loops through the elements in the state order form
        // Then the formData along with its input is then assigned a value from the input field
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        //Order object, this gets submitted to firebase
        const order = {
            ingredients: this.props.ingredients, //Got from URL, which is passed in via react-router
            price: this.props.price, //Recalculation Would Be Needed If The Ingrdients Were Stored On The Server 
            orderData: formData
        }


        //Posts Fake Server Data Via Axios.post(arg1,arg2)
        //.json is required for Firebase
        axios.post("/orders.json", order)

            //Once the order has been Submitted set the load and modalDisplay to false
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push("/"); //Redirects back to root page by pusing the stack on to
            })

            //Something Goes Wrong Then The Modlal And Lading Screen Are Set To False
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }


    //event object is being passed in to access the event of the function
    //inputIdentifier is to allow the id of the element config to be used
    //The outter and inner configuration is copied
    // The value is fetched and validated
    //Copied is set to the config 
    //The state is then updated to reflect the changes
    inputChangedHandler = (event, inputIdentifier) => {

        //Copy the orderForm state
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        //Copy the configuration nested in the object
        //inputIdentifier is the ID e.g. name, street or email 
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        //Get the value of the updateFormElement 
        updatedFormElement.value = event.target.value;

        //Set the copied config e.g. name to the updated
        updatedOrderForm[inputIdentifier] = updatedFormElement;


        //FORM VALIDATION USING REACT JS
  
        // Value gets checked via the validation function(value, rule (validation property))
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
  
        //Set the touched property to true on change of an element, hence it has been tocuhed if it changes
        updatedFormElement.touched = true;

        //By default the form is valid, but the elements also need to be valid into for the form to be processed 
        let formIsValid = true;
        
        //Only if both conditions are true will the form become valid
        //The  form elements and the formisValid must be true, it cant be one or the other
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        //Sets the orderForm to the updatedOrderForm and formIsValid to formIsValid
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    checkValidation(value, rules) {

        let isValid = true;

        //No rules then set it to true automatically 
        if(!rules) {
            return true;
        }

        //Trimmed string must be not empty
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        //Returns isValid to update state
        return isValid;
    }

    render() {

        /************************************************************************************************/
        /*********************************Generating The Form Inputs Dynmaically*************************/
        /************************************************************************************************/

        //Blank array where the input elements will exist
        const formElementsArray = [];

        //Loop through the orderForm state
        for (let key in this.state.orderForm) {

            //Push the elements from the state into the blank array formsElementsArray 
            //Keys are the name, street etc
            //Config is to whatever the key value is
            formElementsArray.push({
                id: key, //Creates A Key For Each Configuration
                config: this.state.orderForm[key] //Stores All The Config Which Is Just The Entire Form
            });
        }

        //Loop through the new array and display the config which is the key,elementType,elementConfig and value
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id} //Id From The loop above
                        elementType={formElement.config.elementType} //local variable + config variable + config section e.g. elementType
                        elementConfig={formElement.config.elementConfig} //local variable + config variable + config section e.g. elementConfig
                        invalid = {!formElement.config.valid} //local variable + config variable + config section e.g. valid
                        shouldValidate = {formElement.config.validation} //Local variable + config variable + config section e.g. validation (validation object)
                        value={formElement.config.value} //local variable + config variable from  + config section e.g. element
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        touched={formElement.config.touched}
                    />
                ))}

                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>

            </form>
        );

        console.log(form)
        //When state is been submited set the form to a spinner, but if its not loading then show form
        if (this.state.loading) {
            form = <Spinner />
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;