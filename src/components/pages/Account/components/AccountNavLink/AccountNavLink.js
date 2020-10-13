import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import styles from './AccountNavLink.module.scss';

const AccountNavLink = ({ to, callback, ariaLabel, icon, exact }) => {
  return ( 
    <li className={styles.root}>
      <NavLink 
        className={styles.link}
        activeClassName={styles.active}
        exact={exact}
        to={to || '/#'}
        onClick={callback}
        aria-label={ariaLabel}
      >
        <FontAwesomeIcon 
          icon={icon}
        />
      </NavLink>
    </li>
  );
}

AccountNavLink.propTypes = {
  to: PropTypes.string,
  callback: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  exact: PropTypes.bool,
};
 
export default AccountNavLink;