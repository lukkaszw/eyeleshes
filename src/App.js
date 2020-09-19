import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SELECTORS from './redux/selectors';

import MainLayout from './components/layout/MainLayout';
import Main from './components/pages/Main';
import Account from './components/pages/Account';
import Clients from './components/pages/Clients';
import Client from './components/pages/Client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';

toast.configure({

});


function App({ isAuth }) {

  const routing = !isAuth ? 
    (
      <Switch>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    )
    :
    (
      <Switch>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/clients/:id">
          <Client />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
        <Redirect to="/clients"/>
      </Switch>
    );

  return (
    <Router>
      <MainLayout>
        {routing}
      </MainLayout>
    </Router>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.user.checkAuth(state),
});

export default connect(mapStateToProps)(App);
