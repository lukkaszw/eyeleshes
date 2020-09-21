import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import Main from '../../pages/Main';

const AppNotAuth = () => {
  return ( 
    <>
     <Switch>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <Header />
    </>
  );
}
 
export default AppNotAuth;