import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {Route , Switch , Redirect , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComp from './hoc/asyncComponent/asyncComponent';


const asyncAuth = asyncComp(() => {
  return import('./containers/Auth/Auth');
});

const asyncCheckout = asyncComp(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComp(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
          <Route path = '/auth' component = {asyncAuth} />
          <Route path = '/' exact component = {BurgerBuilder} />
          <Redirect to ='/' />
      </Switch>
    );

    if(this.props.isAuth){
      routes = (
      <Switch>
        <Route path = '/checkout' component = {asyncCheckout} />
        <Route path = '/orders' component = {asyncOrders} />
        <Route path = '/logout' component = {Logout} />
        <Route path = '/auth' component = {asyncAuth} />
        <Route path = '/' exact component = {BurgerBuilder} />
        <Redirect to ='/' />
      </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuth : state.auth.tokenId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));


//containers contain statefull components.. in which we can manage states