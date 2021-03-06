import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClientsFilters.module.scss';

import InputField from '../../common/InputField';
import Button from '../../common/Button';


const ClientsFilters = ({ searchBy, onChangeSearchBy, onStartAdding }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.inputWrapper}>
        <InputField 
          fullWidth
          label="Szukaj"
          placeholder="Szukaj"
          value={searchBy}
          onChange={(e) => onChangeSearchBy(e.target.value)}
        />
      </div>

      <Button 
        onClick={onStartAdding}
      >
        Dodaj
      </Button>
    </div>
  );
}

ClientsFilters.propTypes = {
  searchBy: PropTypes.string.isRequired,
  onChangeSearchBy: PropTypes.func.isRequired,
  onStartAdding: PropTypes.func.isRequired,
}
 
export default ClientsFilters;