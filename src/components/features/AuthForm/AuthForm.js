import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.scss';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import InlineLink from '../../common/InlineLink';
import CheckboxField from '../../common/CheckboxField';
import AcceptRegulations from './components/AcceptRegulations';

const AuthForm = ({ submitAction, isForRegister, switchAction }) => {

  const submitForm = useCallback((e) => {
    e.preventDefault();
    console.log('hej');
  },[]);

  const [checked, checking] = useState(true);

  const onChange = useCallback(() => checking(prevChecked => !prevChecked), [checking]);

  return ( 
    <div className={styles.root}>
      <form onSubmit={submitForm}>
        <div className={styles.formField}>
          <InputField 
            label="Login"
          />
        </div>
        <div className={styles.formField}>
          <InputField 
            label="Hasło"
            message={isForRegister && 'Minimum 8 znaków!'}
            type="password"
          />
        </div>
        {
          isForRegister &&
          <>
            <div className={styles.formField}>
              <InputField 
                label="Potwierdź hasło"
                type="password"
              />
            </div>
            <div className={styles.formField}>
              <CheckboxField 
                id="name"
                checked={checked}
                onChange={onChange}
                label={
                  <AcceptRegulations 
                    inheritColor={checked}
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