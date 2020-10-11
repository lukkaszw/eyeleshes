import { useState, useCallback } from 'react';

import { visitsValidator } from '../../../utils/validators';

const useDataForm = ({ initialValues }) => {
  const [date, setDate] = useState(initialValues ? new Date(initialValues.date) : new Date());
  const [commentField, setComment] = useState({ 
    value: initialValues ? initialValues.comment : '', 
    error: false, 
  });
  const [priceField, setPrice] = useState({ 
    value: initialValues ? initialValues.price : 0, 
    error: false,
  });

  const [isOpenCalendar, setCalendar] = useState(false);

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
  }, [setComment]);

  const handleChangeDate = useCallback((date) => {
    setDate(date);
    setCalendar(false);
  }, [setDate]);

  //utility handlers
  const handleOpenCalendar = useCallback((e) => {
    e.preventDefault();
    setCalendar(true)
  }, [setCalendar]);
  const handleCloseCalendar = useCallback(() => {
    setCalendar(false)
  }, [setCalendar]);

  return {
    handleCloseCalendar,
    handleOpenCalendar,
    fields: {
      price: priceField,
      comment: commentField,
      date,
    },
    onChangeFor: {
      price: handleChangePrice,
      comment: handleChangeComment,
      date: handleChangeDate
    },
    isOpenCalendar,
  }
};

export default useDataForm;
