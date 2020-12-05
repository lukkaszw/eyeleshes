import React from 'react';
import PropTypes from 'prop-types';
import styles from './SquareBtn.module.scss';
import clsx from 'clsx';

const SquareBtn = ({ children, onClick, isActive, isStretchable }) => {
  return ( 
    <button 
      onClick={onClick}
      className={clsx([styles.root, isActive && styles.active, isStretchable && styles.stretched ])}
    >
      {children}
    </button>
  );
}

SquareBtn.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isStretchable: PropTypes.bool,
};
 
export default SquareBtn;