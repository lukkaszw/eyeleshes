import React from 'react';
import { connect } from 'react-redux';
import SELECTORS from '../../../redux/selectors';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

import Logo from '../Logo';
import DesktopMenu from '../DesktopMenu';

const Header = ({ isAuth }) => {
  return ( 
    <header className={styles.root}>
      <Logo isAuth={isAuth}/>
      <DesktopMenu isAuth={isAuth}/>
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