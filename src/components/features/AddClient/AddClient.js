import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddClient.module.scss';

import Modal from '../../common/Modal';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Alert from '../../common/Alert';

import useAddClientForm from './useAddClientForm';

const AddClient = ({ token, existingClients, isOpen, onClose }) => {

  const {
    fields,
    onChangeFor,
    duplicateError,
    isEmptyError,
    handleCloseAlert,
    handleSubmit,
    isSending,
  } = useAddClientForm({ token, existingClients, onClose });

  return ( 
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
    >
      <>
        <form onSubmit={handleSubmit} className={styles.root}>
          <div>
            <InputField 
              label="Imię"
              placeholder="Imię"
              value={fields.name.value}
              error={fields.name.error}
              onChange={onChangeFor.name}
            />
          </div>
          <div>
            <InputField 
              label="Nazwisko"
              placeholder="Nazwisko"
              value={fields.surname.value}
              error={fields.surname.error}
              onChange={onChangeFor.surname}
            />
          </div>
          <div className='m-top-l'>
            <Button
              type="submit"
              size="small"
              color="tertiary"
              disabled={isSending || isEmptyError || duplicateError}
              isLoading={isSending}
            >
              Dodaj klienta
            </Button>
          </div>
        </form>
        {
          duplicateError &&
            <Alert 
              message="Błąd! Klient o podanym imieniu i nazwisku istnieje!"
              onClick={handleCloseAlert}
            />
        }
      </>
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