/* 
 Import Notes:

 - React to access react features e.g. props 

 - Imports BuildControl.css, used for CSS Modules
*/
import React from 'react';
import classes from "./BuildControl.css";


/* 
Build Control Notes:

- Wrapper named BuildControl

- Label which is from the props, the states defined in the build controls

- The add button adds ingredients via the method referenced in the BuildControls and created in the BurgerBuilder

- The less button removes ingredients via the method referenced in the BuildControls and created in the BurgerBuilder
    - Less than or equal to 0 then its disabled
    - Greater than 0 its not disabled 
*/

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>
            {props.label}
        </div>
        
        <button className={classes.Less} onClick={props.added}>
         Add 
        </button>

        <button className={classes.More} onClick={props.removed} disabled={props.disabled}>
        Less 
        </button>
    </div>
);

export default buildControl;