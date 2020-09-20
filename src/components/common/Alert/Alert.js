import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';
import Button from '../Button/Button';

const Alert = ({ message, onClick, btnColor, btnText }) => {
  return ( 
    <div className={styles.root}>
      <p className={styles.message}>
        {message}
      </p>
      <div className='text-centered'>
        <Button
          onClick={onClick}
          color={btnColor}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  onClick: PropTypes.func,
  btnColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  message: PropTypes.string.isRequired,
  btnText: PropTypes.string,
}

Alert.defaultProps = {
  btnColor: 'secondary',
  btnText: 'OK',
}
 
export default Alert;