import React, { useCallback, useState, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './TodayVisitAdd.module.scss';
import clsx from 'clsx';
import { faPen, faEyeSlash, faEye, faCalendar } from '@fortawesome/free-solid-svg-icons';

import InputField from '../../common/InputField';
import Button from '../../common/Button';

import useVisitForm from '../../../hooks/useVisitForm';

const TodayVisitAdd = memo(function TodayVisitAdd({ token, clientId, refMostUsed, refLastUsed }) {

  const [showForm, setShowForm] = useState(false);

  const handleToggleShowForm = useCallback(() => setShowForm(prev => !prev), [setShowForm]);
  const handleCloseForm = useCallback(() => setShowForm(false), [setShowForm]);

  const {
    fields,
    onChangeFor,
    isSending,
    handleSubmit,
    isEmpty,
  } = useVisitForm({ 
    token,
    clientId,
    onClose: handleCloseForm,
  });

  const handleFillByMostUsed = useCallback((e) => {
    e.preventDefault();
    onChangeFor.parameters({ target: { value: refMostUsed.current.textContent }});
    onChangeFor.method({ target: { value: '' }});
  }, [refMostUsed, onChangeFor]);

  const handleFillByLastUsed = useCallback((e) => {
    e.preventDefault();
    if(refLastUsed.current.textContent.includes(' / ')) {
      const parts = refLastUsed.current.textContent.split(' / ');
      onChangeFor.parameters({ target: { value: parts[0]}});
      onChangeFor.method({ target: { value: parts[1]}});
    }
  }, [refLastUsed, onChangeFor]);

  const handleSelectFill = (ref) => {
    ref.current.style.boxShadow = '0 0 8px 4px var(--purple)';
  };

  const handleUnselectFill = (ref) => {
    ref.current.style.boxShadow = 'none';
  };

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
            ariaLabel="Uzupełnij najczęstszymi"
            onClick={handleFillByMostUsed}
            onMouseOver={() => handleSelectFill(refMostUsed)}
            onMouseOut={() => handleUnselectFill(refMostUsed)}
          />
          <span className={styles.fillinDescription}>
            Uzupełnia najczęstszymi parametrami!
          </span>
        </div>
        <div className={styles.fillin}>
          <Button
            icon={faCalendar}
            size="small"
            ariaLabel="Uzupełnij ostatnimi"
            onClick={handleFillByLastUsed}
            onMouseOver={() => handleSelectFill(refLastUsed)}
            onMouseOut={() => handleUnselectFill(refLastUsed)}
          />
          <span className={styles.fillinDescription}>
            Uzupełnia ostatnimi: parametrami i metodą!
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
        <div className={styles.methodField}>
          <InputField 
            placeholder="Metoda"
            label="Metoda"
            fullWidth
            variant="small"
            onChange={onChangeFor.method}
            value={fields.method.value}
            error={fields.method.error}
          />
        </div>
        <div className={styles.thicknessField}>
          <InputField 
            placeholder="Grubość"
            label="Grubość"
            fullWidth
            variant="small"
            onChange={onChangeFor.thickness}
            value={fields.thickness.value}
            error={fields.thickness.error}
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
});

TodayVisitAdd.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

 
export default TodayVisitAdd;