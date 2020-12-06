import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import styles from './Logo.module.scss';

const Logo = ({ isAuth }) => {
  return ( 
    <Link 
      to={isAuth ? '/' : '/clients'}
      className={styles.root} 
    >
      <img className={styles.image} src="/images/logo/small-logo.png" alt="logo"/>
    </Link>
  );
}

Logo.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
 
export default Logo;