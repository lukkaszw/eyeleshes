import React from 'react';
import styles from './Footer.module.scss';
import clsx from 'clsx';

const Footer = () => {
  return ( 
    <footer className={clsx(styles.root)}>
      &copy; Łukasz Wojdat
    </footer>
  );
}
 
export default Footer;