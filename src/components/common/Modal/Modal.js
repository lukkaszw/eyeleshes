import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Portal from '../../layout/Portal';
import Backdrop from '../Backdrop';
import Button from '../Button';

const Modal = ({ children, isOpen, onClose, domId, transparent }) => {
  return ( 
    <Portal domId={domId}>
      <Backdrop isOpen={isOpen} onClose={onClose}/>
      <div className={clsx([styles.root, isOpen && styles.open, transparent && styles.transparent])}>
        {children}
        <div className={styles.closeBtn}>
          <Button 
            icon={faTimes}
            ariaLabel="zamknij"
            size="small"
            onClick={onClose}
          />
        </div>
      </div>
    </Portal>
  );
}

Modal.propTypes = {
  domId: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transparent: PropTypes.bool,
}

Modal.defaultProps = {
  domId: 'modal',
};
 
export default Modal;