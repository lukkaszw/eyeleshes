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
    isNewEmpty,
    handleChangeOldPassword,
    newPasswordField,
    handleChangeNewPassword,
    handleChangeConfirmPassword,
    confirmPasswordField,
    isSending,
    handleUpdatePassword,
  } = usePasswordUpdate({ token });

  return ( 
    <form
      className={styles.root}
      onSubmit={handleUpdatePassword}
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
          message="min. 8 znaków"
          type="password"
          autoComplete="off"
          label="Nowe hasło"
          error={newPasswordField.error || isNewEmpty}
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
          disabled={isSending}
          isLoading={isSending}
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