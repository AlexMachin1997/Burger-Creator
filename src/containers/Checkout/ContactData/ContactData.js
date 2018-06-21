import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components//UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street:"",
            postalCode: ""
        },
        loading: false
    }

 
    orderHandler = (event) => {
        event.preventDefault();

        //When this component is rendered it passes in the ingredients and total prices.
        //To show the props have been passed in they are console logged elow
        console.log(this.props.ingredients);
        console.log(this.props.price)
             
        //Triggers Load Icon Whilst The Data Gets Added
        this.setState({loading: true})

        //Dummy Javascript Object Which Then Gets Added To Firebase
        const order = {
            ingrdients: this.props.ingredients,
            price: this.props.price, //Recalculation Would Be Needed If The Ingrdients Were Stored On The Server 
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
                this.setState({loading: false})
                this.props.history.push("/")
            })

            //Something Goes Wrong Then The Modlal And Lading Screen Are Set To False
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {

        let form = (
        <form> 
            <input type="text" name="name" placeholder="Enter Your Name"/>
            
            <input type="email" name="email" placeholder="Enter Your Email"/>
            
            <input type="text" name="street" placeholder="Enter Your Street"/>
            
            <input type="text" name="postal" placeholder="Enter Your Postocde"/>
            
            <Button clicked={this.orderHandler} btnType="Success"> ORDER </Button>
        </form>
        );

        //When state is been submited set the form to a spinner, but if its not loading then show form
        if(this.state.loading) {
            form = <Spinner/>
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