import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Modal from '../../common/Modal';
import Button from '../../common/Button';

import styles from './AddEditOptions.module.scss';

const AddEditOptions = ({ 
  isOpen, onClose, 
  clientId, visitId, onOpenFastModal,
  isForEdit,
}) => {

  const linkToCreator = isForEdit ? `/visits/edit_visit/${visitId}` : `/clients/add_visit/${clientId}`;

  return ( 
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.options}>
        <div className={styles.option}>
          <Button
            fullWidth
            component={Link}
            to={linkToCreator}
          >
            Użyj kreatora
          </Button>
        </div>
        <div className={styles.option}>
          <Button
            fullWidth
            color="tertiary"
            onClick={onOpenFastModal}
          >
            { isForEdit ? 'Edytuj szybko' : 'Dodaj szybko'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AddEditOptions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenFastModal: PropTypes.func.isRequired,
  clientId: PropTypes.string,
  visitId: PropTypes.string,
  isForEdit: PropTypes.bool,
};
 
export default AddEditOptions;