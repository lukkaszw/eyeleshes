import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './MobileMenu.module.scss';
import clsx from 'clsx';

import Portal from '../Portal';
import MobileMenuButton from './components/MobileMenuButton';
import MobileMenuNav from './components/MobileMenuNav';

import SELECTORS from '../../../redux/selectors';
 
const MobileMenu = ({ isAuth }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [closedByLink, setClosedByLink] = useState(false);

  const toggleSetOpen = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), [setIsOpen]);

  const closeMenuByLink = useCallback(() => setClosedByLink(true), [setClosedByLink]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 825px)");

    const check = function (x) {
      if(x.matches && isOpen) {
        setIsOpen(false);
      }
    }
    mediaQuery.addEventListener('change', check);
    return () => mediaQuery.removeEventListener('change', check);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    let timeOutId;

    if(closedByLink) {
      timeOutId = setTimeout(() => {
        setIsOpen(false);
        setClosedByLink(false);
      }, 300);
    }

    return () => clearTimeout(timeOutId);
  }, [closedByLink]);

  return ( 
    <Portal domId="mobile-menu">
      <div className={clsx([styles.root, isOpen && styles.open])}>
        <MobileMenuNav 
          onClose={closeMenuByLink}
          isAuth={isAuth}
          isOpen={isOpen} 
        />
        <MobileMenuButton 
          onClick={toggleSetOpen}
          isOpen={isOpen} 
        />
      </div>
    </Portal>
  );
}

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.user.checkAuth(state),
});
 
export default connect(mapStateToProps)(MobileMenu);