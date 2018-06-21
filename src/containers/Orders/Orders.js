import React,{Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                console.log(res.data);
                
                //Blank array
                let fetchedOrders = [];
                
                //Loop through response
                for(let key in res.data ) {
                
                    //Push new object ontop of it
                    fetchedOrders.push({
                        ...res.data[key], //firebase id
                        id: key //key of the object which were the keys from firebase
                    });
                
                }
                this.setState({loading: false, orders: fetchedOrders})
            })

            .catch(res => {
                this.setState({loading: false})
            })    

            console.log(this.state.orders)

    }


    
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients = {order.ingredients}
                        price = {+order.price}
                    />
                ))}
                
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);