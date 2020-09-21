import React from 'react';
import PropTypes from 'prop-types';
import styles from './MobileMenuButton.module.scss';
import clsx from 'clsx';

const MobileMenuButton = ({ onClick, isOpen }) => {
  return ( 
    <button 
      aria-label="otwórz/zamknij menu"
      onClick={onClick}
      className={clsx([styles.root, isOpen && styles.close])}
    >
      <span className={styles.bar}></span>
    </button>
  );
}

MobileMenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}
 
export default MobileMenuButton;