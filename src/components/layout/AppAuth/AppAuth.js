import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './AppAuth.module.scss';

import Account from '../../pages/Account';
import Clients from '../../pages/Clients';
import Client from '../../pages/Client';
import Visit from '../../pages/Visit';
import EditVisit from '../../pages/EditVisit';
import AddVisit from '../../pages/AddVisit';
import Logout from '../../pages/Logout';
import Header from '../Header';
import Footer from '../Footer';
import MobileMenu from '../MobileMenu';
import LoaderIndicator from '../../common/LoaderIndicator';

const AppAuth = () => {
  return ( 
    <div className={styles.root}>
    
      <div className={styles.wrapper}>
        <main className={styles.container}>
          <React.Suspense fallback={<LoaderIndicator isOpen={true}/>}>
            <Switch>
              <Route exact path="/clients">
                <Clients />
              </Route>
              <Route exact path="/clients/add_visit/:id">
                <AddVisit />
              </Route>
              <Route exact path="/clients/:id">
                <Client />
              </Route>
              <Route exact path="/visits/edit_visit/:id">
                <EditVisit />
              </Route>
              <Route exact path="/visits/:id">
                <Visit />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Redirect to="/clients"/>
            </Switch>
          </React.Suspense>
        </main>
        <Footer/>
      </div>
      <Header />
      <MobileMenu />
    </div>
  );
}
 
export default AppAuth;