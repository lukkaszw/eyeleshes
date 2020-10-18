import { useState, useCallback } from 'react';

import { authValidators } from '../../../utils/validators';

const useUserDataUpdate = ({ initialLogin }) => {

  const [loginField, setLoginField] = useState({
    value: initialLogin,
    error: false,
  });
  const [password, setPassword] = useState('');
  const [isEmptyPassword, setEmptyPassword] = useState(false);

  const handleChangeLogin = useCallback(e => {
    setLoginField({
      value: e.target.value,
      error: authValidators.login(e.target.value),
    });
  }, [setLoginField]);
  const handleChangePassword = useCallback(e => {
    setPassword(e.target.value);
    setEmptyPassword(false);
  }, [setPassword, setEmptyPassword]);

  

  return {
    loginField,
    password,
    isEmptyPassword,
    handleChangeLogin,
    handleChangePassword,
  };
}

export default useUserDataUpdate;