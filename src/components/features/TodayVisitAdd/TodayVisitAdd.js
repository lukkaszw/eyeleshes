import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodayVisitAdd.module.scss';
import clsx from 'clsx';
import { faPen, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import InputField from '../../common/InputField';
import Button from '../../common/Button';

import useAddVisitForm from '../../../hooks/useAddVisitForm';

const TodayVisitAdd = ({ token, clientId, refMostUsed }) => {

  const [showForm, setShowForm] = useState(false);

  const handleToggleShowForm = useCallback(() => setShowForm(prev => !prev), [setShowForm]);
  const handleCloseForm = useCallback(() => setShowForm(false), [setShowForm]);

  const {
    fields,
    onChangeFor,
    isSending,
    handleSubmit,
    isEmpty,
  } = useAddVisitForm({ 
    token,
    clientId,
    onClose: handleCloseForm,
  });

  const handleFillByMostUsed = useCallback((e) => {
    e.preventDefault();
    onChangeFor.parameters({ target: { value: refMostUsed.current.textContent }});
  }, [refMostUsed, onChangeFor]);

  const handleSelectMostUsed = useCallback((e) => {
    refMostUsed.current.style.boxShadow = '0 0 8px 4px var(--purple)';
  }, [refMostUsed]);

  const handleUnselectMostUsed = useCallback(() => {
    refMostUsed.current.style.boxShadow = 'none';
  }, [refMostUsed]);

  return ( 
    <div className="m-top-s m-bottom-l text-centered">
      <p className={styles.info}>
        <span className="m-right-m">
          Szybkie dodanie wizyty: 
        </span>
        <Button 
          size="small"
          variant="secondary"
          onClick={handleToggleShowForm}
          icon={showForm ? faEyeSlash : faEye}
          ariaLabel="Pokaż/ukryj formularz"
        />
      </p>
      <form 
        onSubmit={handleSubmit}
        className={clsx([styles.form, showForm && styles.active])}
      >
        <div className={styles.fillin}>
          <Button
            icon={faPen}
            size="small"
            ariaLabel="Uzupełnij"
            onClick={handleFillByMostUsed}
            onMouseOver={handleSelectMostUsed}
            onMouseOut={handleUnselectMostUsed}
          />
          <span className={styles.fillinDescription}>
            Uzupełnia najczęstszymi parametrami!
          </span>
        </div>
        <div className={styles.parametersField}>
          <InputField 
            placeholder="Parametry"
            label="Parametry"
            fullWidth
            variant="small"
            onChange={onChangeFor.parameters}
            value={fields.parameters.value}
            error={fields.parameters.error}
          />
        </div>
        <div className={styles.priceField}>
          <InputField
            label="Cena"
            placeholder="Cena"
            fullWidth
            unit="zł"
            variant="small"
            onChange={onChangeFor.price}
            value={fields.price.value}
            error={fields.price.error}
          />
        </div>
        <div className={styles.btn}>
          <Button
            size="small"
            disabled={isEmpty || isSending}
            isLoading={isSending}
          >
            Dodaj
          </Button>
        </div>
      </form>
    </div>
  );
}

TodayVisitAdd.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

 
export default TodayVisitAdd;