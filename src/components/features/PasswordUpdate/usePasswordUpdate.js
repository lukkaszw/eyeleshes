import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../../api';
import { authValidators } from '../../../utils/validators';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';

const usePasswordUpdate = ({ token }) => {

  const history = useHistory();

  const [oldPassword, setOldPassword] = useState('');
  const [newPasswordField, setNewPasswordField] = useState({
    value: '',
    error: false,
  });
  const [confirmPasswordField, setConfirmPasswordField] = useState({
    value: '',
    error: false,
  });

  const [isOldEmpty, setIsOldEmpty] = useState(false);
  const [isNewEmpty, setIsNewEmpty] = useState(false);

  const handleChangeOldPassword = useCallback((e) => {
    setOldPassword(e.target.value);
    setIsOldEmpty(false);
  }, [setIsOldEmpty, setOldPassword]);

  const handleChangeNewPassword = useCallback(e => {
    setNewPasswordField({
      value: e.target.value,
      error: authValidators.password(e.target.value),
    });
    setIsOldEmpty(false);
  },
  [setNewPasswordField]);

  const handleChangeConfirmPassword = useCallback((e) => {
    setConfirmPasswordField({
      value: e.target.value,
      error: authValidators.confirmPassword(newPasswordField.value, e.target.value),
    });
  }, [newPasswordField.value, setConfirmPasswordField]);

  const [updatePassword, { isLoading: isSending }] = useMutation(API.user.updatePassword, {
    onSuccess: data => {
      history.push('/account/settings');
      toast.success(`Zmieniono hasło użytkownika!`, TOASTS.success);
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
    }
  });

  const handleUpdatePassword = useCallback((e) => {
    e.preventDefault();

    if(newPasswordField.error || confirmPasswordField.error) {
      return;
    }

    if(oldPassword.length === 0) {
      setIsOldEmpty(true);
      return;
    }

    if(newPasswordField.value.length === 0) {
      setIsNewEmpty(true);
      return;
    }

    const newPassword = newPasswordField.value;
    const confirmPassword = confirmPasswordField.value;

    updatePassword({ token, oldPassword, newPassword, confirmPassword });
  }, [token, newPasswordField, confirmPasswordField, oldPassword, setIsOldEmpty, setIsNewEmpty, updatePassword]);

  return {
    oldPassword,
    isOldEmpty,
    isNewEmpty,
    handleChangeOldPassword,
    newPasswordField,
    handleChangeNewPassword,
    handleChangeConfirmPassword,
    confirmPasswordField,
    isSending,
    handleUpdatePassword,
  };
}

export default usePasswordUpdate;