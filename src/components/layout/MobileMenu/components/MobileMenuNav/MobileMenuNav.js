import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './MobileMenuNav.module.scss';
import clsx from 'clsx';

import MobileMenuLink from '../MobileMenuLink';

import {  AUTH_LINKS, NOT_AUTH_LINKS } from '../../../../../settings/navigationLinks';

const MobileMenuNav = ({ isOpen, isAuth, onClose }) => {

  const links = useMemo(() => {
    if(isAuth) {
      return AUTH_LINKS;
    } 
    return NOT_AUTH_LINKS;
  }, [isAuth]);

  return ( 
    <nav className={clsx([styles.root, isOpen && styles.open])}>
      <ul>
        {
          links.map(link => (
            <MobileMenuLink 
              key={link.id}
              onClose={onClose}
              {...link}
            />
          ))
        }
      </ul>
    </nav>
  );
}

MobileMenuNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
 
export default MobileMenuNav;