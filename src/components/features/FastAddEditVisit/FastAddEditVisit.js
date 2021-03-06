import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../common/Modal';
import InputField from '../../common/InputField';
import AddComment from '../AddComment';
import Button from '../../common/Button';
import CalendarModal from '../../common/CalendarModal';
import FillByLastVisit from '../FillByLastVisit';

import { printDate } from '../../../utils/dateInternationalization';
import useVisitForm from '../../../hooks/useVisitForm';

import styles from './FastAddEditVisit.module.scss';

const FastAddEditVisit = memo(function FastAddEditVisit({ 
  token,
  isOpen, onClose,
  chosenClient, initialValues,
  isForEdit, visitId,
  }) {

    const clientId = chosenClient ? chosenClient._id : null;

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
      handleResetFields,
      handleFillFields,
      isEmpty,
    } = useVisitForm({ 
      token,
      onClose, 
      clientId,
      initialValues,
      isForEdit,
      visitId,
    });

    const dateString = useMemo(() => {
      const todayDate = new Date();
      if(todayDate.toLocaleDateString() === fields.date.toLocaleDateString()) {
        return 'dzisiaj';
      }
      return printDate(fields.date, 'pl-PL');
    }, [fields.date]);

    const shouldRenderFilLastVisit = !isForEdit && chosenClient && chosenClient.lastVisit;

  return ( 
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className={styles.root}>
        <p className='m-bottom-m text-centered'>
          {chosenClient && chosenClient.name} {chosenClient && chosenClient.surname}
        </p>
        {
          shouldRenderFilLastVisit &&
            <FillByLastVisit 
              lastVisitData={chosenClient.lastVisit}
              onFillFields={handleFillFields}
              onResetFields={handleResetFields}
            />
        }
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
          <div className={styles.rowFields}>
            <div className={styles.halfField}>
              <InputField 
                placeholder="Grubość"
                label="Grubość"
                fullWidth={true}
                messagePosition="left"
                value={fields.thickness.value}
                onChange={onChangeFor.thickness}
                error={fields.thickness.error}
              />
            </div>
            <div className={styles.halfField}> 
              <InputField 
                placeholder="Metoda"
                label="Metoda"
                fullWidth={true}
                messagePosition="right"
                value={fields.method.value}
                onChange={onChangeFor.method}
                error={fields.method.error}
              />
            </div>
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
              { isForEdit ? 'Edytuj wizytę' : 'Dodaj wizytę' }
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

FastAddEditVisit.propTypes = {
  token: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chosenClient: PropTypes.object,
  initialValues: PropTypes.object,
  isForEdit: PropTypes.bool,
  visitId: PropTypes.string,
};



 
export default FastAddEditVisit;