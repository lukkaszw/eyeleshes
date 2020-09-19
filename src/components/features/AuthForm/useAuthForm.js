import { useState, useCallback } from 'react';
import { authValidators } from '../../../utils/validators';

const useAuthForm = ({ isForRegister }) => {

  const [login, changeLogin] = useState({ value: '', error: false});
  const [password, changePassword] = useState({ value: '', error: false});
  const [confirmPassword, changeConfirmPassword] = useState({ value: '', error: false});
  const [regulationsAgreement, changeRegulationAgreement] = useState({ value: false, error: false});

  const onChangeLogin = useCallback((e) => 
    changeLogin({
      value: e.target.value,
      error: isForRegister ? authValidators.login(e.target.value) : false,
    }), 
    [changeLogin, isForRegister],
  );

  const onChangePassword = useCallback((e) => 
    changePassword({
      value: e.target.value,
      error: isForRegister ? authValidators.password(e.target.value) : false,
    }), 
    [changePassword, isForRegister]
  );

  const onChangeConfirmPassword = useCallback((e) => 
    changeConfirmPassword({
      value: e.target.value,
      error: authValidators.confirmPassword(password.value, e.target.value),
    }), 
    [changeConfirmPassword, password]
  );

  const onChangeRegulationsAgreement = useCallback(() => 
    changeRegulationAgreement(prev => ({
      value: !prev.value,
      error: false,
    })),
    [changeRegulationAgreement]
  );

  const fields = {
    login,
    password,
  };

  if(isForRegister) {
    fields.confirmPassword = confirmPassword;
    fields.regulationsAgreement = regulationsAgreement;
  }

  const values = {
    login: login.value,
    password: password.value,
  };

  if(isForRegister) {
    values.confirmPassword = confirmPassword.value;
  }

  const onChangeFor = {
    login: onChangeLogin,
    password: onChangePassword,
  };

  if(isForRegister) {
    onChangeFor.confirmPassword = onChangeConfirmPassword;
    onChangeFor.regulationsAgreement = onChangeRegulationsAgreement;
  }

  const checkForm = useCallback(() => {
    
    let isError = false;

    Object.entries(fields).forEach(([key, data]) => {
      if(data.error) {
       isError = true;
      }
      if(!data.value) {
        isError = true;

        if(key === 'login') {
          changeLogin(prev => ({value: '', error: true }));
        }

        if(key === 'password') {
          changePassword(prev => ({ value: '', error: true }));
        }

        if(key === 'confirmPassword') {
          changeConfirmPassword(prev => ({ value: '', error: true }));
        }

        if(key === 'regulationsAgreement') {
          changeRegulationAgreement({ value: false, error: true });
        }
      }
    });

    return isError;

  },[fields]);

  return {
    fields,
    values,
    onChangeFor,
    checkForm,
  }

};

export default useAuthForm;