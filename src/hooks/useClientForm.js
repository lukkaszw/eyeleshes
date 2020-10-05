import { useState, useCallback, useMemo } from 'react';
import { useMutation, queryCache } from 'react-query'
import API from '../api';
import { toast } from 'react-toastify';
import TOASTS from '../utils/toasts.config';
import checkDuplicateClient from '../utils/checkDuplicateClient';

const useAddClientForm = ({ 
  token, 
  onClose, 
  existingClients,
  isForEdit,
  clientId,
  initialValues,
}) => {
  //state
  const [nameField, setName] = useState({ value: initialValues ? initialValues.name : '', error: false });
  const [surnameField, setSurname] = useState({ value: initialValues ? initialValues.surname : '', error: false });
  const [duplicateError, setDuplicateError] = useState(false);

  //handlers
  const handleChangeName = useCallback((e) => {
    setName({
      value: e.target.value,
      error: e.target.value.length === 0,
    });
  }, [setName]);
  
  const handleChangeSurname = useCallback((e) => {
    setSurname({
      value: e.target.value,
      error: e.target.value.length === 0,
    });
  }, [setSurname]);

  const handleResetFields = useCallback(() => {
    setName({ value: '', error: false });
    setSurname({ value: '', error: false });
  }, [setName, setSurname]);

  const handleCloseAlert = useCallback(() => setDuplicateError(false), [setDuplicateError]);

  //isEmpty error check
  const isEmptyError = useMemo(() => {
    if(nameField.value.length === 0 || surnameField.value.length === 0) {
      return true;
    } 
    return false;
  }, [nameField, surnameField]);

  const apiAction = isForEdit ? API.clients.editClient : API.clients.addClient;

  //useMutation
  const [submitAction, { isLoading: isSending }] = useMutation(apiAction, {
    onSuccess: data => {
      if(isForEdit) {
        queryCache.invalidateQueries('client');
        queryCache.refetchQueries('clients');
      } else {
        queryCache.invalidateQueries('clients');
        toast.success('Poprawnie dodano klienta!', TOASTS.success);
        handleResetFields();
      }
      onClose();
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
      onClose();
      if(!isForEdit) {
        handleResetFields();
      }
    }
  });


  //handleSubmit
  const handleSubmit = (e) => { 
    e.preventDefault();
    if(isEmptyError) return;

    const name = nameField.value;
    const surname= surnameField.value;

    const isDuplicate = checkDuplicateClient({ name, surname, existingClients });

    if(isDuplicate) {
      setDuplicateError(true);
      return;
    }

    submitAction({ token, name, surname, clientId });
  };


  return {
    fields: {
      name: nameField,
      surname: surnameField,
    },
    onChangeFor: {
      name: handleChangeName,
      surname: handleChangeSurname,
    },
    handleResetFields,
    duplicateError,
    setDuplicateError,
    isEmptyError,
    handleCloseAlert,
    isSending,
    handleSubmit,
  }
}

export default useAddClientForm;