import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckboxField.module.scss';
import clsx from 'clsx';

const CheckboxField = ({ id, checked, label, onChange, error, classes, disabled, ...others }) => {
  return ( 
    <div className={clsx([styles.root, ...classes])}>
      <input 
        className={clsx([styles.input, error && styles.error])}
        id={id}
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...others}
      />
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

CheckboxField.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.node,
  checked: PropTypes.bool,
  error: PropTypes.bool,
  classes: PropTypes.array,
  disabled: PropTypes.bool,
};

CheckboxField.defaultProps = {
  classes: [],
};
 
export default CheckboxField;