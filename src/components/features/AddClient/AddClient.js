import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './AddClient.module.scss';

import Modal from '../../common/Modal';
import InputField from '../../common/InputField';
import Button from '../../common/Button';

const AddClient = ({ token, existingClients, isOpen, onClose }) => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleChangeName = useCallback((e) => setName(e.target.value), [setName]);
  const handleChangeSurname = useCallback((e) => setSurname(e.target.value), [setSurname]);

  return ( 
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className={styles.root}>
        <div>
          <InputField 
            label="Imię"
            placeholder="Imię"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <InputField 
            label="Nazwisko"
            placeholder="Nazwisko"
            value={surname}
            onChange={handleChangeSurname}
          />
        </div>
        <div className='m-top-l'>
          <Button
            type="submit"
            size="small"
            color="tertiary"
          >
            Dodaj klienta
          </Button>
        </div>
      </form>
    </Modal>
  );
}

AddClient.propTypes = {
  token: PropTypes.string.isRequired,
  existingClients: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
 
export default AddClient;