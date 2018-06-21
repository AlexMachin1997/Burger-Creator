/* 
Import Notes: 
- Imports react to make this component a stateful component
- Imports Modal.css to allow CSS modules to be enabled
- Imports a higher order function, auxiliary. This is a wrapper which generates children elements
- Imports backdrop because every modal needs a backdrop 
*/

import React, {Component} from "react";
import classes from "./Modal.css"
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import BackDrop from "../Backdrop/Backdrop";

/* 
Import Notes: 
- A life cycle model is implimneted. 
    - shouldComponentUpdate, it only updates if the show prop or any children change
    - componentWillUpdate, shows the compoenent was updated

- Then the JSX is rendered and returned
    - Backdrop component is then applied and the props show and clicked are passed in. 
        - It shows conditionally 
        - When the backdrop is clicked it closes down, setting its state to false

    - Modal  is then construcuted
        - It contains a wrapper from the CSS modules
        - Then some condtional styles are played 
            - If the show prop is true show and set the opacity to 1
            - But if its not true then take it away from the screen and set the opacity to 0 
    
    - Generate children between the modal e.g. text between the component
*/

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log("[Modal.js] Component Will Update")
    }

    render() {
        return (
            //Wrap Content In An Aux Wrapper, And Generate The Child Elements e.g. Content Between The Opening And Closing
            <Aux>
                {/* 
                    Conditioanlly Displays
                    When It Appears The Animation Plays
                */}
                <BackDrop 
                    show={this.props.show} 
                    clicked={this.props.modalClosed}
                />
                
                <div className={classes.Modal} 
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                       opacity: this.props.show ? "1" : "0"
                }}> 
                {this.props.children}
                </div>
            </Aux>
        )
    }
}
export default Modal;