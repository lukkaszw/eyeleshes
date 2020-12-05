import { useState, useCallback } from 'react';
import { visitsValidator } from '../../../utils/validators';

const useMethod = ({ initialMethod }) => {

  const [method, setMethod] = useState(initialMethod || '');

  const handleChangeMethod = useCallback((e) => setMethod(e.target.value), [setMethod]);
  const handleSetMethod = useCallback((methodName) => setMethod(methodName), [setMethod]);

  const isMethodValid = method.length > 0 && !visitsValidator.method(method);

  return {
    method,
    handleChangeMethod,
    handleSetMethod,
    isMethodValid,
  };
}

export default useMethod;