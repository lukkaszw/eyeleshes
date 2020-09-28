import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './FastAddVisit.module.scss';

import Modal from '../../common/Modal';
import InputField from '../../common/InputField';
import AddComment from '../../features/AddComment';
import Button from '../../common/Button';
import CalendarModal from '../../common/CalendarModal';

import { printDate } from '../../../utils/dateInternationalization';
import useAddVisitForm from './useAddVisitForm';

const FastAddVisit = ({ 
  token,
  isOpen, onClose,
  chosenClient
  }) => {

    const {
      fields,
      onChangeFor,
      handleToggleComment,
      handleCloseCalendar,
      handleOpenCalendar,
      isOpenCalendar,
      isAddingComment,
      isSending,
      handleSubmit,
      isEmpty,
    } = useAddVisitForm({ 
      token,
      onClose, 
      clientId: chosenClient ? chosenClient._id : null 
    });



    const dateString = useMemo(() => {
      const todayDate = new Date();
      if(todayDate.toLocaleDateString() === fields.date.toLocaleDateString()) {
        return 'dzisiaj';
      }
      return printDate(fields.date, 'pl-PL');
    }, [fields.date]);


  return ( 
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className={styles.root}>
        <p className='m-bottom-m text-centered'>
          {chosenClient && chosenClient.name} {chosenClient && chosenClient.surname}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <InputField 
              placeholder="Parametry"
              label="Parametry"
              messagePosition="right"
              message="Format: 12-13c-16-12d..."
              value={fields.parameters.value}
              onChange={onChangeFor.parameters}
              error={fields.parameters.error}
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
              value={fields.price.value}
              onChange={onChangeFor.price}
              error={fields.price.error}
            />
          </div>
          <div className={styles.optionField}>
            <span className={styles.option}>
              data: 
              <span className={styles.optionValue}>
                {dateString}
              </span>
            </span>
            <span>
              <Button
                ariaLabel="Zmień"
                icon={faCalendar}
                onClick={handleOpenCalendar}
              />
            </span>
            <CalendarModal 
              isOpen={isOpenCalendar}
              onClose={handleCloseCalendar}
              value={fields.date}
              onChange={onChangeFor.date}
            />
          </div>
          <div className={styles.optionField}>
            <span className={styles.option}>
              uwagi: 
              <span className={styles.optionValue}>
                { fields.comment.value.length > 0 ? 'dodano' : 'brak'}
              </span>
            </span>
            <span>
              <Button
                ariaLabel="Dodaj uwagę"
                icon={faPen}
                onClick={handleToggleComment}
                variant="secondary"
              />
            </span>
          </div>
          <AddComment 
            isOpen={isAddingComment}
            value={fields.comment.value}
            onChange={onChangeFor.comment}
            error={fields.comment.error}
          />
          <div className="m-top-l">
            <Button
              color="tertiary"
              disabled={isEmpty || isSending}
              isLoading={isSending}
              size="small"
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