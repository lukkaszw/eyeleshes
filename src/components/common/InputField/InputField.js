import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './InputField.module.scss';

const InputField = ({ 
  id, value, label, type, inputProps,
  onChange, error, message, autoComplete,
  unit, variant, messagePosition,
  fullWidth, transparent }) => {
  return ( 
    <div className={clsx([
        styles.root, 
        error && styles.error,
        transparent && styles.transparent,
        fullWidth && styles.fullWidth
      ])}>
      <input 
        {...inputProps}
        className={clsx([styles.input, unit && styles.withUnit, variant && styles[variant]])}
        id={id} 
        value={value}
        type={type}
        onChange={onChange}
        placeholder={label}
        autoComplete={autoComplete}
      />
      <label 
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      {
        unit &&
        <span className={styles.unit}>
          {unit}
        </span>
      }
      <p
        className={clsx([styles.message,  messagePosition && styles[messagePosition]])}
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
  unit: PropTypes.string,
  variant: PropTypes.oneOf(['normal', 'small']),
  error: PropTypes.bool,
  message: PropTypes.string,
  fullWidth: PropTypes.bool,
  transparent: PropTypes.bool,
  autoComplete: PropTypes.string,
  messagPosition: PropTypes.oneOf(['left', 'right', 'center']),
}

InputField.defaultProps = {
  type: 'text',
};
 
export default InputField;