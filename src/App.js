import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import SELECTORS from './redux/selectors';

import AppNotAuth from './components/layout/AppNotAuth';
import AppAuth from './components/layout/AppAuth';

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

  const content = !isAuth ? 
    <AppNotAuth />
    :
    <AppAuth />

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        {content}
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
