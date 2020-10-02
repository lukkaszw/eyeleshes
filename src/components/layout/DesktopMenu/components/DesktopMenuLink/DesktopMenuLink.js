import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import styles from './DesktopMenuLink.module.scss';
import clsx from 'clsx';

const DesktopMenuLink = ({ to, title, isAuth, exact }) => {
  return ( 
    <li className={clsx([styles.root, isAuth && styles.auth])}>
      <NavLink 
        className={styles.link}
        to={to}
        exact={exact}
        activeClassName={styles.active}
      >
        {title}
      </NavLink>
    </li>
  );
}

DesktopMenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isAuth: PropTypes.bool,
  exact: PropTypes.bool,
}

DesktopMenuLink.defaultProps = {
  exact: false,
};
 
export default DesktopMenuLink;