/* 
Imports Notice
- Import react so props can be recieved and sent
- Imports Button.css so CSS modules can be used
*/

import React from 'react';
import classes from './Button.css';

/* 
Imports Notice
- By default the button gets a styling of Button

- But then the success or danger classes are applied conditionally depending if the sucess or danger string is applied
    - Button + Success = Green Button 
    - Button + Danger = Red Button
    - To pass in the conditional button type btntype needs to be passeed into th Button component

- The any text in between is generated via the props.children
*/

const button = (props) => (

    //By Defaiut The Button Class Gets Added
    //But When The Button Comonent Is Refered To The btnType IS Defined Which Deinfes If Its Success Or Warning
    //E.g If THe btnType is Success CSS Modules WIll Identify What Styling To Apply And Then The Button And Conditiona CLass Is Joined Together To Form A ClassName
    //onClick Event Refers To A Method Passed Via Props
    //{props.children} generates the button text e.g. Cancel Or Continue
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;