import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = ( props ) => {

    //Default The Mobile Menu Is Closed
    //The Closed Class Is Open
    let attachedClasses = [classes.SideDrawer, classes.Close];


    //If The Props Is Open
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        //Aux Is The Wrapper
        <Aux>
            {/* 
                Backdrop and its children Notes:
                - On Click of the backdrop(Outside Of The Menu) it closes it down
                
                - The backdrop show prop adds the conditionally
                    If the backdrop can applied then it attaches the array of CSS Modules by using the join method to form a string
                    If the backdrop isnt applied the argument is null is expectured, menaing the backdrop wont be there    
                    The props.open is used in the Layout, It Referes The showSideDrawer Method 
            */}
            <Backdrop show={props.open} clicked={props.closed}/>
            
            {/* 
                SideDrawer (Mobile Menu) :
                - It References The Logo Component Which Gets The Image
                - Adds The Navigation Items To The SideDrawer via The NavigationItems Component
            */}
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>

        </Aux>
    );
};

export default sideDrawer;