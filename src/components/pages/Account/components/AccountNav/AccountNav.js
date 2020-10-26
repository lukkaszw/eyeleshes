import React from 'react';
import { useHistory } from 'react-router-dom';

import AccountNavLink from '../AccountNavLink';

import { ACCOUNT_NAV } from '../../../../../settings/navigationLinks';

import styles from './AccountNav.module.scss';

const AccountNav = () => {

  const history = useHistory();

  const handleGoBack = e => {
    e.preventDefault();
    history.goBack();
  }

  return ( 
    <nav className={styles.root}>
      <ul className={styles.list}>
        {
          ACCOUNT_NAV.map(link => {
            if(link.callback === 'GO_BACK') {
              return (
                <AccountNavLink 
                  key={link.id}
                  {...link}
                  callback={handleGoBack}
                />
              )
            }
            return (
              <AccountNavLink 
                key={link.id}
                {...link}  
              />
            )
          })
        }
      </ul>
    </nav>
  );
}
 
export default AccountNav;