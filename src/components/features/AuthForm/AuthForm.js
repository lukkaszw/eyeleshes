import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.scss';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import InlineLink from '../../common/InlineLink';
import CheckboxField from '../../common/CheckboxField';
import AcceptRegulations from './components/AcceptRegulations';
import Alert from '../../common/Alert';

import { useMutation } from 'react-query';
import useAuthForm from './useAuthForm';
import { toast } from 'react-toastify';

const AuthForm = ({ apiAction, onLogin, isForRegister, switchAction }) => {

  const { 
    checkForm,
    fields,
    apiError,
    setApiError,
    onResetApiError,
    values,
    onChangeFor,
  } = useAuthForm({ isForRegister });

  const [submitAction, { isLoading: isSending }] = useMutation(apiAction, {
    onSuccess: data => {
      console.log('jest tu');
      const { token, user } = data;
      onLogin({ token, user });
      localStorage.setItem('tkn', token);
      toast.success(isForRegister ? 'Zostałeś pomyślnie zarejestrowany!' : 'Zostałeś pomyślnie zalogowany!', {
        className: 'toast-success-custom toast-background',
        bodyClassName: 'toast-custom-body',
      });
    },
    onError: data => {
      setApiError(data.response.data.error);
    }
  });

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();

    const isError = checkForm();
    if(isError) {
      return;
    }

    submitAction(values);

  }, [checkForm, submitAction, values]);


  return ( 
    <div className={styles.root}>
      <form onSubmit={onSubmitForm}>
        <div className={styles.formField}>
          <InputField 
            label="Login"
            value={fields.login.value}
            error={fields.login.error}
            onChange={onChangeFor.login}
            message={isForRegister && 'od 3 do 12 znaków!'}
          />
        </div>
        <div className={styles.formField}>
          <InputField 
            label="Hasło"
            message={isForRegister && 'minimum 8 znaków!'}
            type="password"
            value={fields.password.value}
            error={fields.password.error}
            onChange={onChangeFor.password}
          />
        </div>
        {
          isForRegister &&
          <>
            <div className={styles.formField}>
              <InputField 
                label="Potwierdź hasło"
                type="password"
                value={fields.confirmPassword.value}
                error={fields.confirmPassword.error}
                onChange={onChangeFor.confirmPassword}
              />
            </div>
            <div className={styles.formField}>
              <CheckboxField 
                id="name"
                checked={fields.regulationsAgreement.value}
                onChange={onChangeFor.regulationsAgreement}
                error={fields.regulationsAgreement.error}
                label={
                  <AcceptRegulations 
                    inheritColor={true}
                  />
                }
              />
            </div>
          </>
        }
        <div className={styles.buttonWrapper}>
          <Button
            type="submit"
            disabled={isSending || !!apiError}
            isLoading={isSending}
          >
            {isForRegister ? 'Zarejestruj się' : 'Zaloguj się'}
          </Button>
        </div>
      </form>
      <p className={styles.question}>
        {isForRegister ? 'Masz już konto?' : 'Nie masz konta?'}
        <InlineLink
          to={isForRegister ? '#login' : '#register'}
          onClick={switchAction}
          classes={['p-left-m']}
        >
          {
            isForRegister ? 'Zaloguj się!' : 'Zarejestruj się!'
          }
        </InlineLink>
      </p>
      {
        apiError &&
          <Alert 
            message={apiError}
            onClick={onResetApiError}
          />
      }
    </div>
  );
}

AuthForm.propTypes = {
  apiAction: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  isForRegister: PropTypes.bool,
  switchAction: PropTypes.func,
}
 
export default AuthForm;