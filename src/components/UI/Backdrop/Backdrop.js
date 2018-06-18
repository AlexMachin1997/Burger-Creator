import React from "react";
import classes from "./Backdrop.css";

const backdrop = (props) => (
    //If props is true then else 
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}> </div> : null
);
export default backdrop;