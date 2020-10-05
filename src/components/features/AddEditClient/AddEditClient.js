import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddEditClient.module.scss';

import Modal from '../../common/Modal';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Alert from '../../common/Alert';

import useClientForm from '../../../hooks/useClientForm';
const AddEditClient = ({ 
  token, clientId, isForEdit,
  existingClients, initialValues,
  isOpen, onClose,  }) => {

  const {
    fields,
    onChangeFor,
    duplicateError,
    isEmptyError,
    handleCloseAlert,
    handleSubmit,
    isSending,
  } = useClientForm({ token, existingClients, onClose, clientId, initialValues, isForEdit });

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
              {
                isForEdit ? 'Edytuj dane' : 'Dodaj klienta'
              }
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

AddEditClient.propTypes = {
  isForEdit: PropTypes.bool,
  clientId: PropTypes.string,
  initialValues: PropTypes.object,
  token: PropTypes.string.isRequired,
  existingClients: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
 
export default AddEditClient;