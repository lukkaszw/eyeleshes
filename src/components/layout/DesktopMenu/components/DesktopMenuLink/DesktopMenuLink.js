import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import styles from './DesktopMenuLink.module.scss';

const DesktopMenuLink = ({ to, title }) => {
  return ( 
    <li className={styles.root}>
      <NavLink 
        className={styles.link}
        to={to}
        exact
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
}
 
export default DesktopMenuLink;