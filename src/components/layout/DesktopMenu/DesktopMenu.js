import React from 'react';

import { NOT_AUTH_LINKS, AUTH_LINKS } from '../../../settings/navigationLinks';

import DesktopMenuLink from './components/DesktopMenuLink';

import PropTypes from 'prop-types';
import styles from './DesktopMenu.module.scss';

const DesktopMenu = ({ isAuth }) => {

  const links = isAuth ? AUTH_LINKS : NOT_AUTH_LINKS;

  return ( 
    <nav>
      <ul className={styles.root}>
        {
          links.map(link => (
            <DesktopMenuLink 
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