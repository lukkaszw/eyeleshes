import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './CalendarModal.module.scss';

import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';
import Modal from '../Modal';

const CalendarModal = ({
  isOpen, 
  onChange,
  onClose,
  value
}) => {
  return ( 
    <Modal 
      transparent
      domId="calendar-modal"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={clsx([styles.root, isOpen && styles.open])}>
        <Calendar 
          value={value}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
}

CalendarModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}
 
export default CalendarModal;