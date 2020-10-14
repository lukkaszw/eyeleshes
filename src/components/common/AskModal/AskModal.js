import React from 'react';
import PropTypes from 'prop-types';
import styles from './AskModal.module.scss';

import Modal from '../Modal';
import Button from '../Button';

const AskModal = ({ 
  isOpen, onClose,
  question, noAnswear, yesAnswear,
  onNoAction, onYesAction,
  onNoBtnColor, onYesBtnColor,
  yesLoading, noLoading, yesDisabled, noDisabled,
}) => {
  return ( 
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.root}>
        <p className={styles.question}>
          {question}
        </p>
        <div className={styles.btns}>
          <Button
            size="small"
            color={onNoBtnColor}
            onClick={onNoAction}
            disabled={noDisabled}
            isLoading={noLoading}
          >
            {noAnswear}
          </Button>
          <Button
            size="small"
            color={onYesBtnColor}
            onClick={onYesAction}
            disabled={yesDisabled}
            isLoading={yesLoading}
          >
            {yesAnswear}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  noAnswear: PropTypes.string.isRequired,
  yesAnswear: PropTypes.string.isRequired,
  onNoAction: PropTypes.func.isRequired,
  onYesAction: PropTypes.func.isRequired,
  yesLoading: PropTypes.bool,
  noLoading: PropTypes.bool,
  yesDisabled: PropTypes.bool,
  noDisabled: PropTypes.bool,
  onNoBtnColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  onYesBtnColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
};

AskModal.defaultProps = {
  onNoBtnColor: 'secondary',
  onYesBtnColor: 'tertiary',
  noAnswear: 'Nie',
  yesAnswear: 'Tak',
}
 
export default AskModal;