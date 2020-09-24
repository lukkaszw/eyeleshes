import React from 'react';
import styles from './ClientsFilters.module.scss';

import InputField from '../../common/InputField';
import Button from '../../common/Button';


const ClientsFilters = () => {
  return ( 
    <div className={styles.root}>
      <div className={styles.inputWrapper}>
        <InputField 
          fullWidth
          label="Szukaj"
          placeholder="Szukaj"
        />
      </div>

      <Button 

      >
        Dodaj
      </Button>
    </div>
  );
}
 
export default ClientsFilters;