import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Auth.module.scss';

import SignUpForm from '../../features/AuthForm/AuthForm.signup.container';
import SignInForm from '../../features/AuthForm/AuthForm.signin.container';

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
          <SignInForm 
            switchAction={switchToRegister}
          />
        </div>
        <div className={styles.form}>
          <SignUpForm 
            switchAction={switchToLogin}
          />
        </div>
      </div>
    </div>
  );
}
 
export default Auth;