import React, { useCallback, useState } from 'react';
import styles from './TodayVisitAdd.module.scss';
import clsx from 'clsx';
import { faPen, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import InputField from '../../common/InputField';
import Button from '../../common/Button';

const TodayVisitAdd = () => {

  const [showForm, setShowForm] = useState(false);

  const handleToggleShowForm = useCallback(() => setShowForm(prev => !prev), [setShowForm]);

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
      <form className={clsx([styles.form, showForm && styles.active])}>
        <div className={styles.fillin}>
          <Button
            icon={faPen}
            size="small"
            ariaLabel="Uzupełnij"
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
          />
        </div>
        <div className={styles.priceField}>
          <InputField
            label="Cena"
            placeholder="Cena"
            fullWidth
            unit="zł"
            variant="small"
          />
        </div>
        <div className={styles.btn}>
          <Button
            size="small"
          >
            Dodaj
          </Button>
        </div>
      </form>
    </div>
  );
}
 
export default TodayVisitAdd;