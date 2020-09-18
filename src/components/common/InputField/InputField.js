import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './InputField.module.scss';

const InputField = ({ 
  id, value, label, type, inputProps,
  onChange, error, message,
  fullWidth }) => {
  return ( 
    <div className={clsx([
        styles.root, 
        error && styles.error,
        fullWidth && styles.fullWidth
      ])}>
      <input 
        {...inputProps}
        className={styles.input}
        id={id} 
        value={value}
        type={type}
        onChange={onChange}
        placeholder={label}
      />
      <label 
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <p
        className={styles.message}
      >
        {message ? message : <>&ensp;</>}
      </p>
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputProps: PropTypes.object,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  message: PropTypes.string,
  fullWidth: PropTypes.bool,
}

InputField.defaultProps = {
  type: 'text',
};
 
export default InputField;