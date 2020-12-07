import { useState, useCallback } from 'react';
import { visitsValidator } from '../../../utils/validators';

const useMethod = ({ initialMethod, initialThickness }) => {

  const [method, setMethod] = useState(initialMethod || '');
  const [thickness, setThickness] = useState(initialThickness || '');

  const handleChangeMethod = useCallback((e) => setMethod(e.target.value), [setMethod]);
  const handleSetMethod = useCallback((methodName) => setMethod(methodName), [setMethod]);
  const handleChangeThickness = useCallback((e) => setThickness(e.target.value), [setThickness]);
  const handleSetThickness = useCallback((thicknessMethod) => setThickness(thicknessMethod), [setThickness]);

  const isMethodValid = (method.length > 0 && !visitsValidator.method(method)) && 
    (thickness.length > 0 && !visitsValidator.thickness(thickness));

  return {
    method,
    thickness,
    handleChangeMethod,
    handleSetMethod,
    handleChangeThickness,
    handleSetThickness,
    isMethodValid,
  };
}

export default useMethod;