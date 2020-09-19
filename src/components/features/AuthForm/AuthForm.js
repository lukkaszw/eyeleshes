import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.scss';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import InlineLink from '../../common/InlineLink';
import CheckboxField from '../../common/CheckboxField';
import AcceptRegulations from './components/AcceptRegulations';

import useAuthForm from './useAuthForm';

const AuthForm = ({ submitAction, isForRegister, switchAction }) => {

  const { 
    submitForm,
    fields,
    onChangeFor,
  } = useAuthForm(submitAction, isForRegister);

  return ( 
    <div className={styles.root}>
      <form onSubmit={submitForm}>
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
    </div>
  );
}

AuthForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
  isForRegister: PropTypes.bool,
  switchAction: PropTypes.func,
}
 
export default AuthForm;