import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    //Default State
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    //Setting The State
    
    //The showSideDrawer : !prevState.showSideDrawer Logic Notes:
        //False then toggles the menu via setting the state to true
        //True the menn is hidden 
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            
            //<Aux> </Aux> renders children elements so the toolbar
            <Aux>
                
                {/*
                 Toolbar (Mobile Menu):
                 - drawbarToggleClicked is a prop which passed a reference to the method sideDrawerToggleHandler   
                 
                 - Within the toolbar component there is a prop, that prop is clicked, on "click" it references the
                 drawerToggleClicked prop which then passes a reference to the method sideDrawerToggleHandler.
                 
                 - The sideDrawerToggleHandler access the previous state
                    If the previous state is false, it sets it to true
                    If the previous state is true it sets it to false to hide the menu
                */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                 />

                {/* Generates children via the props.children and because this is a statefull component it has access tothe props
                */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;