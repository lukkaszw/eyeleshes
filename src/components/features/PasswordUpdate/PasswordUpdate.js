import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../../common/InputField';
import Button from '../../common/Button';

import usePasswordUpdate from './usePasswordUpdate';

import styles from './PasswordUpdate.module.scss';

const PasswordUpdate = ({ token }) => {

  const {
    oldPassword,
    isOldEmpty,
    handleChangeOldPassword,
    handleChangeNewPassword,
    handleChangeConfirmPassword,
    newPasswordField,
    confirmPasswordField,
  } = usePasswordUpdate();

  return ( 
    <form
      className={styles.root}
    >
      <div>
        <InputField 
          value={oldPassword}
          onChange={handleChangeOldPassword}
          placeholder="Stare hasło"
          type="password"
          autoComplete="off"
          label="Stare hasło"
          error={isOldEmpty}
        />
      </div>
      <div className='m-top-s'>
        <InputField 
          value={newPasswordField.value}
          onChange={handleChangeNewPassword}
          placeholder="Nowe hasło"
          message="od 3 do 12 znaków"
          type="password"
          autoComplete="off"
          label="Nowe hasło"
          error={newPasswordField.error}
        />
      </div>
      <div className='m-top-s'>
        <InputField 
          value={confirmPasswordField.value}
          onChange={handleChangeConfirmPassword}
          placeholder="Potwierdź nowe hasło"
          type="password"
          autoComplete="off"
          label="Potwierdź nowe hasło"
          error={confirmPasswordField.error}
        />
      </div>
      <div className="m-top-xl">
        <Button 
          type="submit"
        >
          Zmień hasło
        </Button>
      </div>
    </form>
  );
}

PasswordUpdate.propTypes = {
  token: PropTypes.string.isRequired,
};
 
export default PasswordUpdate;