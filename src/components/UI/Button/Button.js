import React from 'react';

import classes from './Button.css';

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