import React, { useMemo } from 'react';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './CreatorData.module.scss';

import Button from '../../../../common/Button';
import CalendarModal from '../../../../common/CalendarModal';
import AddComment from '../../../AddComment';
import InputField from '../../../../common/InputField';

import { printDate } from '../../../../../utils/dateInternationalization';

const CreatorData = ({ 
  fields,
  onChangeFor,
  onOpenCalendar, onCloseCalendar, isOpenCalendar,
  onSubmit, isSending, isError, 
  isForEdit,
}) => {

  const dateString = useMemo(() => {
    const todayDate = new Date();
    if(todayDate.toLocaleDateString() === fields.date.toLocaleDateString()) {
      return 'dzisiaj';
    }
    return printDate(fields.date, 'pl-PL');
  }, [fields.date]);

  return ( 
    <form 
      onSubmit={onSubmit}
      className={styles.root}
    >
      <div>
        <span className={styles.date}>Data wizyty: {dateString} </span>
        <Button
          ariaLabel="Zmień datę"
          icon={faCalendar}
          onClick={onOpenCalendar}
        />
        <CalendarModal 
          isOpen={isOpenCalendar}
          onClose={onCloseCalendar}
          value={fields.date}
          onChange={onChangeFor.date}
        />
      </div>
      <div className={styles.comment}>
        <AddComment 
          isOpen={true}
          value={fields.comment.value}
          error={fields.comment.error}
          onChange={onChangeFor.comment}
        />
      </div>
      <div className={styles.price}>
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
      <div className="m-top-l">
        <Button
          disabled={isSending || isError}
          isLoading={isSending}
        >
          { isForEdit ? 'Edytuj wizytę' : 'Dodaj wizytę'}
        </Button>
      </div>
    </form>
  );
}

CreatorData.propTypes = {
  fields: PropTypes.object,
  onChangeFor: PropTypes.object,
  onOpenCalendar: PropTypes.func.isRequired,
  onCloseCalendar: PropTypes.func.isRequired,
  isOpenCalendar: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isForEdit: PropTypes.bool,
}
 
export default CreatorData;