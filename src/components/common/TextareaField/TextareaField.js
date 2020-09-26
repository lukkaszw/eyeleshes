import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextareaField.module.scss';
import clsx from 'clsx';

const TextareaField = ({
  id, rows, cols, fullWidth,
  placeholder, label, message,
  error,
  value, onChange
}) => {
  return ( 
    <div className={clsx([
        styles.root, 
        fullWidth && styles.fullWidth,
        error && styles.error,
      ])}
    >
      <textarea
        id={id}
        value={value}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        onChange={onChange} 
        className={styles.textarea}
      >
      </textarea>
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

TextareaField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string, 
  rows: PropTypes.number, 
  cols: PropTypes.number,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
  message: PropTypes.string,
};
 
export default TextareaField;