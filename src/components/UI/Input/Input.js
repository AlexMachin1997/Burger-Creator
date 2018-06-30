import React from "react";
import classes from "./Input.css";

/* 
Input Notes: 

- A switch is used to decide which input to use.

- A temp variable named inputElement, it stores the input JSX

- Switch Statement :
    - A temp variable is stored, it gets overwritten with the returned JSX 
    - It accepts props which is the elementType, the state defined in the ContactData.js
    - For each case there is an input element is used, this could be input, textarea or select
        - In each of the input fields there is a class which is assingned to the element for styling purposes 
        - The state elementConfig is copied and passed into the input element
        - The valie is the empty string from the state, each input has one and when it changes it gets updated via the onchange method
    - After each switch case there is a break;
    - Also there is a default input which is the input case

JSX Notes:
- The temp variable used in the switch gets returned in the JSX, it outputs the input element
*/



const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];


    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType) {

        case("input") :
            inputElement = (
                <input 
                    className={inputClasses.join(" ")} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />  
            ) 
            break;

        case("textarea") :
            inputElement =(
                <textarea 
                    className={inputClasses.join(" ")}
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed} //Input Specific Event e.g. onClick, Onsubmit, onChange
                />
            )
            break;

        case("select") :
            inputElement = (
                <select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
                    {/* Maps through the object of values avaliable */}
                    {props.elementConfig.options.map(option => (
                      
                      /* Loops through elementConfig options and passes in a value, key and displayValue */
                      <option value={option.value} key={option.value}>
                            {option.displayValue} 
                        </option> 
                   
                   ))}
                </select>
            );
            break;

        default:
            inputElement = <input className={inputClasses.join(" ")} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;


