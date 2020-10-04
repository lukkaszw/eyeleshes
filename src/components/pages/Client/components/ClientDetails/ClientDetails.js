import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './ClientDetails.module.scss';
import PropTypes from 'prop-types';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Button from '../../../../common/Button';
import Modal from '../../../../common/Modal';

import { printDate } from '../../../../../utils/dateInternationalization';

const ClientDetails = ({ _id, name, surname, onOpenAddingModal, createdAt }) => {

  const [areOpenOptions, setAreOpenOptions] = useState(false);

  const handleOpenOptions = useCallback(() => setAreOpenOptions(true), [setAreOpenOptions]);
  const handleCloseOptions = useCallback(() => setAreOpenOptions(false), [setAreOpenOptions]);

  const handleOpenFastAdd = useCallback(() => {
    onOpenAddingModal();
    handleCloseOptions();
  }, [onOpenAddingModal, handleCloseOptions])

  return ( 
    <header className="m-bottom-m">
      <p className={clsx([styles.created, 'm-bottom-l'])}>
        dodany do bazy: {printDate(createdAt)}
      </p>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.personals}>
            <p className={styles.field}>
              <span className={styles.fieldName}>Imię:</span>
              <span className={styles.fieldValue}>{name}</span>
            </p>
            <p className={styles.field}>
              <span className={styles.fieldName}>Nazwisko:</span>
              <span className={styles.fieldValue}>{surname}</span>
            </p>
          </div>
          <Button 
            size="small"
            icon={faCog}
            variant="secondary"
          />
        </div>
        <div className={styles.right}>
          <div className={styles.field}>
            <Button
              size="small"
              onClick={handleOpenOptions}
            >
              Dodaj wizytę
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={areOpenOptions}
        onClose={handleCloseOptions}
      >
        <div className={styles.options}>
          <div className={styles.option}>
            <Button
              fullWidth
              component={Link}
              to={`/clients/add_visit/${_id}`}
            >
              Użyj kreatora
            </Button>
          </div>
          <div className={styles.option}>
            <Button
              fullWidth
              color="tertiary"
              onClick={handleOpenFastAdd}
            >
              Dodaj szybko
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  );
}

ClientDetails.propTypes = {
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  onOpenAddingModal: PropTypes.func.isRequired,
};
 
export default ClientDetails;