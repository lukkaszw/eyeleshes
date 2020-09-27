import React from 'react';
import styles from './ClientDetails.module.scss';
import PropTypes from 'prop-types';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Button from '../../../../common/Button';

import { printDate } from '../../../../../utils/dateInternationalization';

const ClientDetails = ({ name, surname, createdAt }) => {
  return ( 
    <header className="m-bottom-m">
      <p className={clsx([styles.created, 'm-bottom-l'])}>
        dodany do bazy: {printDate(createdAt)}
      </p>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.personals}>
            <p className={styles.field}>
              <span className={styles.fieldName}>Imię:</span>
              <span className={styles.fieldValue}>{name}</span>
            </p>
            <p className={styles.field}>
              <span className={styles.fieldName}>Nazwisko:</span>
              <span className={styles.fieldValue}>{surname}</span>
            </p>
          </div>
          <Button 
            size="small"
            icon={faCog}
            variant="secondary"
          />
        </div>
        <div className={styles.right}>
          <div className={styles.field}>
            <Button
              size="small"
            >
              Dodaj wizytę
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

ClientDetails.propTypes = {
  createdAt: PropTypes.string.isRequired,
};
 
export default ClientDetails;