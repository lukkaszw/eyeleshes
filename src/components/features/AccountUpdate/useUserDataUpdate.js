import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { authValidators } from '../../../utils/validators';
import API from '../../../api';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';

const useUserDataUpdate = ({ token, initialLogin, onUpdateUserData }) => {

  const history = useHistory();

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

  const [updateLogin, { isLoading: isSending }] = useMutation(API.user.updateLogin, {
    onSuccess: data => {
      onUpdateUserData(data);
      history.push('/account/settings');
      toast.success(`Zmieniono dane użytkownika!`, TOASTS.success);
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
    }
  });

  const handleUpdateLogin = useCallback((e) => {
    e.preventDefault();

    if(loginField.error) {
      return;
    }

    if(password.length === 0) {
      setEmptyPassword(true);
      return;
    }

    updateLogin({ token, password, login: loginField.value });
  }, [loginField, updateLogin, password, token]);

  return {
    loginField,
    password,
    isEmptyPassword,
    handleChangeLogin,
    handleChangePassword,
    handleUpdateLogin,
    isSending,
  };
}

export default useUserDataUpdate;