import React, { Suspense, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './ClientSettings.module.scss';

import Modal from '../../../../common/Modal';
import Button from '../../../../common/Button';
import AskModal from '../../../../common/AskModal';
import EditClient from '../EditClient';

import useDeleteClient from '../../useDeleteClient';

const ClientSettings = ({ 
  token, clientId,  name, surname,
  isOpen, onClose,
}) => {

  const {
    isDeleting,
    handleCancelDeleting,
    handleStartDeleting,
    handleDelete,
    isSending,
  } = useDeleteClient({ token, clientId });

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = useCallback(() => setIsEditOpen(true), [setIsEditOpen]);
  const handleCloseEdit = useCallback(() => setIsEditOpen(false), [setIsEditOpen]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={styles.root}>
          <div className="m-bottom-s">
            <span className={styles.option}>
            Imię:
            </span>
            <strong>{name}</strong>
          </div>
          <div className="m-bottom-l">
            <span className={styles.option}>
              Nazwisko:
            </span>
            <strong>{surname}</strong>
          </div>
          <div className={styles.btns}>
            <Button
              size="small"
              color="secondary"
              onClick={handleStartDeleting}
            >
              Usuń klienta
            </Button>
            <Button
              color="tertiary"
              size="small"
              onClick={handleOpenEdit}
            >
              Edytuj dane
            </Button>
          </div>
        </div>
      </Modal>
      <AskModal 
        isOpen={isDeleting}
        onClose={handleCancelDeleting}
        onNoAction={handleCancelDeleting}
        onYesAction={handleDelete}
        question={`Czy jesteś pewien, że chcesz usunąć klienta: ${name} ${surname}? Zmiany będą nieodwracalne!`}
        yesAnswear="Tak"
        noAnswear="Nie"
        yesDisabled={isSending}
        noDisabled={isSending}
        yesLoading={isSending}
      />
      <Suspense fallback="">
        <EditClient 
          token={token}
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          name={name}
          surname={surname}
          clientId={clientId}
        />
      </Suspense>
    </div>
  );
}

ClientSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
}
 
export default ClientSettings;