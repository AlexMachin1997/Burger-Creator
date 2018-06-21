/* 
Import Notes:
- Importing react so the stateless component can receive props
- Import Logo.css so CSS modules can be used
- Imports logo from the assets folder, webpack handles the rest
*/

import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png"
import classes from "./Logo.css"

/* 
Logo Notes
- Adds a class to the div and sets the height 
- uses the burgerLogo so wepack can interpret it when its build the application 
*/

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Burger Logo"/>    
    </div>
)

export default logo;