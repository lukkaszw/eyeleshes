import { useState, useCallback } from 'react';

import { authValidators } from '../../../utils/validators';

const usePasswordUpdate = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPasswordField, setNewPasswordField] = useState({
    value: '',
    error: false,
  })
  const [confirmPasswordField, setConfirmPasswordField] = useState({
    value: '',
    error: false,
  });

  const [isOldEmpty, setIsOldEmpty] = useState(false);

  const handleChangeOldPassword = useCallback((e) => {
    setOldPassword(e.target.value);
    setIsOldEmpty(false);
  }, [setIsOldEmpty, setOldPassword]);

  const handleChangeNewPassword = useCallback(e => {
    setNewPasswordField({
      value: e.target.value,
      error: authValidators.password(e.target.value),
    });
  },
  [setNewPasswordField]);

  const handleChangeConfirmPassword = useCallback((e) => {
    setConfirmPasswordField({
      value: e.target.value,
      error: authValidators.confirmPassword(newPasswordField.value, e.target.value),
    });
  }, [newPasswordField.value, setConfirmPasswordField]);

  return {
    oldPassword,
    isOldEmpty,
    handleChangeOldPassword,
    newPasswordField,
    handleChangeNewPassword,
    handleChangeConfirmPassword,
    confirmPasswordField,
  };
}

export default usePasswordUpdate;