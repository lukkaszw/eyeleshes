import React from 'react';
import PropTypes from 'prop-types';

import AskModal from '../../../../common/AskModal';
import Modal from '../../../../common/Modal';
import InputField from '../../../../common/InputField';
import Button from '../../../../common/Button';

import styles from './RemoveUser.module.scss';

const RemoveUser = ({ 
  isStartRemoving, isRemoving, onCancelRemoving,
  showPassword, onShowPassword, onHidePassword,
  onChangePassword, password, onRemoveUser,
  formError,
}) => {

  return ( 
    <div>
      <AskModal 
        isOpen={isStartRemoving}
        onClose={onCancelRemoving}
        question="Czy jesteś pewien, że chcesz usunąć konto? Odzyskanie konta oraz powiązanych z nim danych będzie niemożliwe!!!"
        onNoAction={onCancelRemoving}
        onYesAction={onShowPassword}
        onYesBtnColor='secondary'
        onNoBtnColor='tertiary'
      />
      <Modal
        isOpen={showPassword}
        onClose={onHidePassword}
      >
        <form onSubmit={onRemoveUser} className={styles.removeConfirmation}>
          <InputField 
            onChange={onChangePassword}
            value={password}
            type="password"
            placeholder="Hasło"
            label="Hasło"
            error={formError}
          />
          <div className="m-top-l">
            <Button
              type="submit"
              color="secondary"
              size="small"
              disabled={isRemoving}
              isLoading={isRemoving}
            >
              Potwierdź usunięcie konta
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

RemoveUser.propTypes = {
  password: PropTypes.string.isRequired,
  formError: PropTypes.bool.isRequired,
  isRemoving: PropTypes.bool.isRequired,
  showPassword: PropTypes.bool.isRequired,
  isStartRemoving: PropTypes.bool.isRequired,
  onCancelRemoving: PropTypes.func.isRequired,
  onShowPassword: PropTypes.func.isRequired,
  onHidePassword: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};
 
export default RemoveUser;