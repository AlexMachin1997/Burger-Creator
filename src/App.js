/* 
Import Notes: 
- React is imported along with component so this can be a stateful component
- Layout is imported from the higher order function folder
- BurgerBuilder is imported so the component can be generated from the root router
- Checkout is imported so the route can generate the component 
- Route and Switch is imported from the react-router-dom
  - Route allows paths to be defiend
  - Switch loops through the children elements specified below (Routes), it then only renders the first route which matches
*/

import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from "react-router-dom";


/* 
Import Notes: 
- Returns JSX via the render method 
- The JSX is wrapped in a parent div 
- It returns the Layout (Menus)
- Then the switch is used for routing
*/

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>       
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
