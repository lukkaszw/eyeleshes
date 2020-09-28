import { useState, useCallback } from 'react';
import { useMutation, queryCache } from 'react-query'
import API from '../../../api';
import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';
import checkFieldsErrors from '../../../utils/checkFieldsErrors';
import { visitsValidator } from '../../../utils/validators';

const useAddVisitForm = ({ token, onClose, clientId }) => {
  //main state
  const [parametersField, setParameters] = useState({ value: '', error: false, exact: true });
  const [priceField, setPrice] = useState({ value: 0, error: false });
  const [commentField, setComment] = useState({ value: '', error: false });
  const [date, setDate] = useState(new Date());

  //utility state
  const [isAddingComment, setAddingComment] = useState(false);
  const [isOpenCalendar, setCalendar] = useState(false);

  //main handlers
  const handleChangeParameters = useCallback((e) => {
    setParameters({
      value: e.target.value,
      error: visitsValidator.parameters(e.target.value),
    });
  }, [setParameters]);

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
    setParameters({ value: '', error: false });
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

  //useMutation
  const [submitAction, { isLoading: isSending }] = useMutation(API.visits.addVisit, {
    onSuccess: data => {
      queryCache.invalidateQueries('clients', 'stats');
      toast.success('Poprawnie dodano wizytę!', TOASTS.success);
      onClose();
      handleResetFields();
    },
    onError: data => {
      toast.success(data.response.data.error, TOASTS.error);
      onClose();
      handleResetFields();
    }
  });

  //handleSubmit
  const handleSubmit = (e) => { 
    e.preventDefault();

    const isError = checkFieldsErrors([parametersField, priceField, commentField]);

    if(isError) return;

    const parameters = parametersField.value.split('-');
    const price = parseFloat(priceField.value);
    const comment = commentField.value;

    submitAction({ token, parameters, price, comment, clientId, date });
  };


  const isEmpty = parametersField.value.length === 0;

  return {
    fields: {
      parameters: parametersField,
      price: priceField,
      comment: commentField,
      date,
    },
    onChangeFor: {
      parameters: handleChangeParameters,
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

export default useAddVisitForm;