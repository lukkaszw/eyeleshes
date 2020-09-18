import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Auth.module.scss';

import AuthForm from '../../features/AuthForm';

const Auth = () => {

  const location = useLocation();

  const [formNr, setFormNr] = useState(1); 

  const switchToRegister = useCallback(() => setFormNr(2), [setFormNr]);
  const switchToLogin = useCallback(() => setFormNr(1), [setFormNr]);

  useEffect(() => {
    if(location.hash === '#register' && formNr === 1) {
      switchToRegister();
    }
  });

  

  return ( 
    <div className={styles.root}>
      <div className={clsx([styles.wrapper, formNr === 2 && styles.register])}>
        <div className={styles.form}>
          <AuthForm 
            switchAction={switchToRegister}
          />
        </div>
        <div className={styles.form}>
          <AuthForm 
            switchAction={switchToLogin}
            isForRegister
          />
          
        </div>
      </div>
    </div>
  );
}
 
export default Auth;