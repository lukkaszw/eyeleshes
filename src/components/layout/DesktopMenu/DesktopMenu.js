import React from 'react';

import { NOT_AUTH_LINKS, AUTH_LINKS } from '../../../settings/navigationLinks';

import DesktopMenuLink from './components/DesktopMenuLink';

import PropTypes from 'prop-types';
import styles from './DesktopMenu.module.scss';
import clsx from 'clsx';

const DesktopMenu = ({ isAuth }) => {

  const links = isAuth ? AUTH_LINKS : NOT_AUTH_LINKS;

  return ( 
    <nav>
      <ul className={clsx([styles.root, isAuth && styles.auth])}>
        {
          links.map(link => (
            <DesktopMenuLink 
              isAuth={isAuth}
              key={link.id}
              {...link} 
            />
          ))
        }
      </ul>
    </nav>
  );
}

DesktopMenu.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
 
export default DesktopMenu;