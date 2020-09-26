import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './FastAddVisit.module.scss';

import Modal from '../../common/Modal';
import InputField from '../../common/InputField';
import AddComment from '../../features/AddComment';
import Button from '../../common/Button';
import CalendarModal from '../../common/CalendarModal';

import { printDate } from '../../../utils/dateInternationalization';

const FastAddVisit = ({ 
  token,
  isOpen, onClose,
  chosenClient
  }) => {

    const [isAddingComment, setAddingComment] = useState(false);
    const [isChangingDate, setChangingDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [comment, setComment] = useState('');

    const handleOpenCalendar = useCallback((e) => {
      e.preventDefault();
      setChangingDate(true)
    }, [setChangingDate]);
    const handleCloseCalendar = useCallback(() => {
      setChangingDate(false)
    }, [setChangingDate]);
    const handleDate = useCallback((date) => {
      setDate(date);
      setChangingDate(false);
    }, [setDate]);

    const handleToggleComent = useCallback((e) => {
      e.preventDefault();
      setAddingComment(prevIsAdding => !prevIsAdding)
    }, [setAddingComment]);
    const onChangeComment = useCallback((e) => setComment(e.target.value), [setComment]);



    const dateString = useMemo(() => {
      const todayDate = new Date();
      if(todayDate.toLocaleDateString() === date.toLocaleDateString()) {
        return 'dzisiaj';
      }
      return printDate(date, 'pl-PL');
    }, [date]);


  return ( 
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className={styles.root}>
        <p className='m-bottom-m text-centered'>
          {chosenClient && chosenClient.name} {chosenClient && chosenClient.surname}
        </p>
        <form>
          <div>
            <InputField 
              placeholder="Parametry"
              label="Parametry"
              message="Format: 12-13c-16-12d..."
            />
          </div>
          <div>
            <InputField 
              label="Cena"
              placeholder="Cena"
              type="number"
              unit="zł"
              inputProps={{
                step: "0.01",
                min: "0.00",
              }}
            />
          </div>
          <div className={styles.optionField}>
            <span className={styles.option}>
              data: <span className={styles.optionValue}>{dateString}</span>
            </span>
            <span>
              <Button
                ariaLabel="Zmień"
                icon={faCalendar}
                onClick={handleOpenCalendar}
              />
            </span>
            <CalendarModal 
              isOpen={isChangingDate}
              onClose={handleCloseCalendar}
              value={date}
              onChange={handleDate}
            />
          </div>
          <div className={styles.optionField}>
            <span className={styles.option}>
              uwagi: <span className={styles.optionValue}>{ comment.length > 0 ? 'dodano' : 'brak'}</span>
            </span>
            <span>
              <Button
                ariaLabel="Dodaj uwagę"
                icon={faPen}
                onClick={handleToggleComent}
                variant="secondary"
              />
            </span>
          </div>
          <AddComment 
            isOpen={isAddingComment}
            value={comment}
            onChange={onChangeComment}
          />
          <div className="m-top-l">
            <Button
              color="tertiary"
            >
              Dodaj wizytę
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

FastAddVisit.propTypes = {
  token: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chosenClient: PropTypes.object,
};



 
export default FastAddVisit;