import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './AccountSettings.module.scss';

import Button from '../../common/Button';
import RemoveUser from './components/RemoveUser';

import useRemoveUser from './useRemoveUser';


const AccountSettings = ({ token }) => {


  const {
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
  } = useRemoveUser({ token });

  return ( 
    <div className={styles.root}>
      <div className="m-top-l">
          <Button
            fullWidth
            component={Link}
            to="/account/settings/update"
          >
            Zmień dane konta
          </Button>
      </div>
      <div className="m-top-l">
          <Button
            fullWidth
            component={Link}
            to="/account/settings/pswd"
          >
            Zmień hasło
          </Button>
      </div>
      <div className="m-top-l">
          <Button
            fullWidth
            component={Link}
            to="/logout"
          >
            Wyloguj się
          </Button>
      </div>
      <div className="m-top-xxl">
          <Button
            color="secondary"
            fullWidth
            onClick={handleStartRemoving}
          >
            Usuń konto
          </Button>
      </div>
      <RemoveUser 
        isStartRemoving={isStartRemoving}
        showPassword={showPassword}
        password={password}
        onCancelRemoving={handleCancelRemoving}
        onShowPassword={handleShowPassword}
        onHidePassword={handleHidePassword}
        onChangePassword={handleChangePassword}
        onRemoveUser={handleRemoveUser}
        isRemoving={isSending}
        formError={isError}
      />
    </div>
  );
}

AccountSettings.propTypes = {
  token: PropTypes.string.isRequired,
};
 
export default AccountSettings;