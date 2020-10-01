import { useState, useCallback } from 'react';

import { yearsValidators } from '../../../utils/validators';

const useFilters = ({ yearFrom, yearTo, onChangeYears, handleCloseModal }) => {


  const [yearFirst, setYearFirst] = useState({ value: yearFrom || '2000', error: false });
  const [yearSecond, setYearSecond] = useState({ value: yearTo, error: false });

  const handleChangeYearFirst = useCallback((e) => {
    setYearFirst({
      value: e.target.value,
      error: yearsValidators.yearFrom(e.target.value),
    });

    if(parseInt(e.target.value) > parseInt(yearSecond.value)) {
      setYearSecond({ value: e.target.value, error: false });
    }
  }, [setYearFirst, setYearSecond, yearSecond.value]);

  const handleChangeYearSecond = useCallback((e) => {
    setYearSecond({
      value: e.target.value,
      error: yearsValidators.yearTo(e.target.value, yearFirst.value),
    })
  }, [setYearSecond, yearFirst.value]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onChangeYears({ yearFrom: yearFirst.value, yearTo: yearSecond.value });
    handleCloseModal();
  }, [onChangeYears, handleCloseModal, yearFirst, yearSecond]); 

  return {
    handleSubmit,
    yearFirst,
    yearSecond,
    handleChangeYearFirst,
    handleChangeYearSecond,
  };
}

export default useFilters;