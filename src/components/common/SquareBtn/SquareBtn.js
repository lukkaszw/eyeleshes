import React from 'react';
import PropTypes from 'prop-types';
import styles from './SquareBtn.module.scss';
import clsx from 'clsx';

const SquareBtn = ({ children, onClick, isActive }) => {
  return ( 
    <button 
      onClick={onClick}
      className={clsx([styles.root, isActive && styles.active ])}
    >
      {children}
    </button>
  );
}

SquareBtn.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};
 
export default SquareBtn;