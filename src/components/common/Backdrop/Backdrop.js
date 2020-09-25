import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import styles from './Backdrop.module.scss';

const Backdrop = ({ isOpen, onClose }) => (
  <div 
    className={clsx([styles.root, isOpen && styles.open ])}
    onClick={onClose} 
  />
);

Backdrop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

 
export default Backdrop;