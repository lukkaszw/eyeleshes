import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountSettings.module.scss';

import Button from '../../common/Button';


const AccountSettings = () => {
  return ( 
    <div className={styles.root}>
     <div className="m-top-l">
        <Button
          fullWidth
          component={Link}
          to="/account/settings/update"
        >
          Zmień dane konta
        </Button>
     </div>
     <div className="m-top-l">
        <Button
          fullWidth
          component={Link}
          to="/account/settings/pswd"
        >
          Zmień hasło
        </Button>
     </div>
     <div className="m-top-l">
        <Button
          fullWidth
          component={Link}
          to="/logout"
        >
          Wyloguj się
        </Button>
     </div>
     <div className="m-top-xxl">
        <Button
          color="secondary"
          fullWidth
          component={Link}
        >
          Usuń konto
        </Button>
     </div>
    </div>
  );
}
 
export default AccountSettings;