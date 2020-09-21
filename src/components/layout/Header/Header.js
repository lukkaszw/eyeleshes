import React from 'react';
import { connect } from 'react-redux';
import SELECTORS from '../../../redux/selectors';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import clsx from 'clsx';

import Logo from '../Logo';
import DesktopMenu from '../DesktopMenu';

const Header = ({ isAuth }) => {
  return ( 
    <header className={clsx([styles.root, isAuth && styles.auth])}>
      <div className={styles.container}>
        <Logo isAuth={isAuth}/>
        <DesktopMenu isAuth={isAuth}/>
      </div>
    </header>
  );
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.user.checkAuth(state),
});
 
export default connect(mapStateToProps)(Header);