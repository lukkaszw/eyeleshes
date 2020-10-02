import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenuLink.module.scss';

const MobileMenuLink = ({ title, to, exact, onClose  }) => {
  return ( 
    <li className={styles.root}>
      <NavLink 
        className={styles.link}
        activeClassName={styles.active}
        onClick={onClose}
        exact={exact} 
        to={to}
      > 
        {title}
      </NavLink>
    </li>
  );
}

MobileMenuLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

MobileMenuLink.defaultProps = {
  exact: false,
}
 
export default MobileMenuLink;