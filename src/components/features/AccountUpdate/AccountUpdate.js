import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../../common/InputField';
import Button from '../../common/Button';

import useUserDataUpdate from './useUserDataUpdate';

import styles from './AccountUpdate.module.scss';

const AccountUpdate = ({ token, login }) => {

  const {
    loginField,
    password,
    handleChangeLogin,
    handleChangePassword,
    isEmptyPassword,
  } = useUserDataUpdate({ initialLogin: login });

  return ( 
    <form
      className={styles.root}
    >
      <div>
        <InputField 
          value={loginField.value}
          onChange={handleChangeLogin}
          message="od 3 do 12 znaków"
          placeholder="Nowy login"
          label="Nowy login"
          error={loginField.error}
        />
      </div>
      <div className='m-top-s'>
        <InputField 
          value={password}
          onChange={handleChangePassword}
          placeholder="Potwierdź hasłem"
          type="password"
          autoComplete="off"
          label="Potwierdź hasłem"
          error={isEmptyPassword}
        />
      </div>
      <div className="m-top-xl">
        <Button 
          type="submit"
        >
          Zmień login
        </Button>
      </div>
    </form>
  );
}

AccountUpdate.propTypes = {
  token: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
};
 
export default AccountUpdate;