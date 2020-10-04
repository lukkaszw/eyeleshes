import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddComment.module.scss';
import clsx from 'clsx';

import TextareaField from '../../common/TextareaField';

const AddComment = ({ onChange, value, isOpen, error }) => {

  return ( 
    <div className={clsx([styles.root, isOpen && styles.open])}>
      <TextareaField 
        placeholder="Komentarz opcjonalnie"
        label="Komentarz opcjonalnie"
        value={value}
        rows={3}
        onChange={onChange}
        fullWidth
        error={error}
        message={`${value.length}/500`}
      />
    </div>
  );
}

AddComment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
}
 
export default AddComment;