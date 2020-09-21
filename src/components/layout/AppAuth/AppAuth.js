import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './AppAuth.module.scss';

import Account from '../../pages/Account';
import Clients from '../../pages/Clients';
import Client from '../../pages/Client';
import Logout from '../../pages/Logout';
import Header from '../Header';
import Footer from '../Footer';
import MobileMenu from '../MobileMenu';


const AppAuth = () => {
  return ( 
    <div className={styles.root}>
      <Header />
      <div className={styles.wrapper}>
        <main className={styles.container}>
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
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Redirect to="/clients"/>
          </Switch>
        </main>
        <Footer/>
      </div>
      <MobileMenu />
    </div>
  );
}
 
export default AppAuth;