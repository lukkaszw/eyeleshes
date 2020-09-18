import React from 'react';
import { 
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styles from './Main.module.scss';

import Footer from '../../layout/Footer';
import MainContent from './components/MainContent';
import Auth from '../Auth';
import About from '../About';

const Main = () => {
  return ( 
    <div className={styles.root}>
      <main className={styles.main}>
        <Switch>
          <Route exact path="/">
            <MainContent />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </div>
   );
}
 
export default Main;