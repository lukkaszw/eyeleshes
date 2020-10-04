import { useState, useCallback } from 'react';

import { visitsValidator } from '../../../utils/validators';

const useDataForm = () => {
  const [date, setDate] = useState(new Date());
  const [commentField, setComment] = useState({ value: '', error: false });
  const [priceField, setPrice] = useState({ value: 0, error: false });

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
