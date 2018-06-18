import React, {Component} from "react";
import classes from "./Modal.css"
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import BackDrop from "../Backdrop/Backdrop";

class Modal extends Component {

    //Only Updates If Show Prop Changes Or Any Of Its Children Props 
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