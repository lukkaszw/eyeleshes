import { useState, useCallback } from 'react';
import { useMutation, queryCache } from 'react-query'
import API from '../api';
import { toast } from 'react-toastify';
import TOASTS from '../utils/toasts.config';
import checkFieldsErrors from '../utils/checkFieldsErrors';
import { visitsValidator } from '../utils/validators';

const useVisitForm = ({ token, onClose, clientId, visitId, initialValues, isForEdit }) => {
  //main state
  const [parametersField, setParameters] = useState({ 
    value: initialValues ? initialValues.parameters : '', 
    error: false, 
    exact: true, 
  });
  const [methodField, setMethod] = useState({
    value: initialValues ? initialValues.method : '',
    error: false,
    exact: true,
  });
  const [priceField, setPrice] = useState({ 
    value: initialValues ? initialValues.price : 0, 
    error: false 
  });
  const [commentField, setComment] = useState({ 
    value: initialValues ? (initialValues.comment || '') : '', 
    error: false 
  });
  const [date, setDate] = useState(
    initialValues ? new Date(initialValues.date) : new Date()
  );

  //utility state
  const [isAddingComment, setAddingComment] = useState(false);
  const [isOpenCalendar, setCalendar] = useState(false);

  //main handlers
  const handleChangeParameters = useCallback((e) => {
    setParameters({
      value: e.target.value,
      error: visitsValidator.parameters(e.target.value),
      exact: true,
    });
  }, [setParameters]);

  const handleChangeMethod = useCallback((e) => {
    setMethod({
      value: e.target.value,
      error: visitsValidator.method(e.target.value),
      exact: true,
    })
  }, [setMethod]);

  const handleChangePrice = useCallback((e) => {
    setPrice({
      value: e.target.value,
      error: visitsValidator.price(e.target.value),
    });
  }, [setPrice]);

  const handleChangeComment = useCallback((e) => {
    setComment({
      value: e.target.value,
      error: visitsValidator.comment(e.target.value),
    });
  }, [setComment])

  const handleChangeDate = useCallback((date) => {
    setDate(date);
    setCalendar(false);
  }, [setDate]);

  const handleResetFields = useCallback(() => {
    setParameters({ value: '', error: false, exact: true, });
    setMethod({value: '', error: false, exact: true, });
    setComment({ value: '', error: false });
    setDate(new Date());
    setPrice({ value: 0, error: false });
  }, [setParameters, setComment, setDate, setPrice]);

  //utility handlers
  const handleOpenCalendar = useCallback((e) => {
    e.preventDefault();
    setCalendar(true)
  }, [setCalendar]);
  const handleCloseCalendar = useCallback(() => {
    setCalendar(false)
  }, [setCalendar]);

  const handleToggleComment = useCallback((e) => {
    e.preventDefault();
    setAddingComment(prevIsAdding => !prevIsAdding)
  }, [setAddingComment]);

  const apiAction = isForEdit ? API.visits.editVisit : API.visits.addVisit;

  //useMutation
  const [submitAction, { isLoading: isSending }] = useMutation(apiAction, {
    onSuccess: data => {
      queryCache.invalidateQueries('visits');
      queryCache.refetchQueries('stats');
      queryCache.refetchQueries('clients');
      if(isForEdit) {
        queryCache.invalidateQueries('visit');
      }
      toast.success(isForEdit ? 'Poprawnie edytowano wizytę' : 'Poprawnie dodano wizytę!', TOASTS.success);
      onClose();
      if(!isForEdit) {
        handleResetFields();
      }
    },
    onError: data => {
      toast.success(data.response.data.error, TOASTS.error);
      onClose();
      if(!isForEdit) {
        handleResetFields();
      }
    }
  });

  //handleSubmit
  const handleSubmit = (e) => { 
    e.preventDefault();

    const isError = checkFieldsErrors([parametersField, methodField, priceField, commentField]);

    if(isError) return;

    const parameters = parametersField.value.split('-');
    const method = methodField.value;
    const price = parseFloat(priceField.value);
    const comment = commentField.value;

    submitAction({ token, parameters, method, price, comment, date, clientId, visitId  });
  };


  const isEmpty = parametersField.value.length === 0 || methodField.value.length === 0;

  return {
    fields: {
      parameters: parametersField,
      price: priceField,
      comment: commentField,
      method: methodField,
      date,
    },
    onChangeFor: {
      parameters: handleChangeParameters,
      method: handleChangeMethod,
      price: handleChangePrice,
      comment: handleChangeComment,
      date: handleChangeDate
    },
    handleToggleComment,
    handleCloseCalendar,
    handleOpenCalendar,
    isOpenCalendar,
    isAddingComment,
    isSending,
    handleSubmit,
    isEmpty,
  }
}

export default useVisitForm;