import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MobileNav.module.scss';
import MobileNavBtn from './components/MobileNavBtn';
import Portal from '../Portal';

const MobileNav = memo(function MobileNav({ navActions, onAddAction }) {

  const history = useHistory();

  const handleGoBack = e => {
    e.preventDefault();
    history.goBack();
  }

  return ( 
    <Portal domId="mobile-nav">
      <nav className={styles.root}>
        <ul className={styles.list}>
          {
            navActions.map((action) => {
              let callback;

              switch(action.callback) {
                case 'GO_BACK':
                  callback = handleGoBack;
                  break;
                case 'ADD': 
                  callback = onAddAction;
                  break;
                default: 
                  callback = null;
              }
              
              return (
                <MobileNavBtn 
                  key={action.id}
                  {...action}
                  callback={callback}
                />
              )
            })
          }
        </ul>
      </nav>
    </Portal>
  );
});

MobileNav.propTypes = {
  navActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddAction: PropTypes.func,
};
 
export default MobileNav;