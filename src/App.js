import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

import API from './api';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactQueryConfigProvider } from 'react-query';

toast.configure();
const queryConfig = {
  suspense: true,
  cacheTime: -1,
};


function App({ isAuth, onTryLoginOnStart }) {

  useEffect(() => {
    onTryLoginOnStart();
  }, [onTryLoginOnStart]);

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
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <MainLayout>
          {routing}
        </MainLayout>
      </Router>
    </ReactQueryConfigProvider>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  onTryLoginOnStart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.user.checkAuth(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTryLoginOnStart: () => dispatch(API.user.tryLoginOnStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
