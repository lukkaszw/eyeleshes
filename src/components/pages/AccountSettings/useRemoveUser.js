import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';
import API from '../../../api';

const useRemoveUser = ({ token }) => {

  const history = useHistory();
  const [isStartRemoving, setIsStartRemoving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleStartRemoving = useCallback(() => setIsStartRemoving(true), [setIsStartRemoving]);
  const handleCancelRemoving = useCallback(() => setIsStartRemoving(false), [setIsStartRemoving]);
  const handleShowPassword = useCallback(() => {
    setShowPassword(true);
    setIsStartRemoving(false);
  }, [setShowPassword, setIsStartRemoving]);
  const handleHidePassword = useCallback(() => setShowPassword(false), [setShowPassword]);
  
  const handleChangePassword = useCallback((e) => {
    setIsError(false);
    setPassword(e.target.value);
  }, [setPassword, setIsError]);

  
  //useMutation
  const [deleteUser, { isLoading: isSending }] = useMutation(API.user.deleteUser, {
    onSuccess: data => {
      toast.success(`Poprawnie usunięto użytkownika ${data.login}!`, TOASTS.success);
      history.push('/logout');
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
    }
  });

  const handleRemoveUser= useCallback((e) => {
    e.preventDefault();

    if(password.length === 0) {
      setIsError(true);
      return;
    }
    
    deleteUser({ token, password });
  }, 
  [token, password, deleteUser]);


  return {
    isStartRemoving,
    handleStartRemoving,
    handleCancelRemoving,
    showPassword,
    password,
    isSending,
    handleShowPassword,
    handleHidePassword,
    handleRemoveUser,
    handleChangePassword,
    isError,
  };
}

export default useRemoveUser;