import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import TopInfoLink from '../../../../common/TopInfoLink';
import DivideLine from '../../../../common/DivideLine';
import Button from '../../../../common/Button';

import { printDate } from '../../../../../utils/dateInternationalization';
import { printParameters } from '../../../../../utils/printParameters';

import styles from './VisitInfo.module.scss';

const VisitInfo = ({ 
  clientId, name, surname,
  parameters, method, date, comment, price,
  onStartDeleting, onStartEditing,
}) => {
  return ( 
    <div>
      <div className={styles.top}>
        <TopInfoLink 
          ariaLabel="Wróć do strony klienta"
          link={`/clients/${clientId}`}
          text={`${name} ${surname}`}
        />
      </div>
      <div className={styles.btns}>
        <Button 
          icon={faEdit}
          color="secondary"
          onClick={onStartEditing}
        />
        <Button
          icon={faTrashAlt}
          onClick={onStartDeleting}
        />
      </div>
      <div className="m-top-s m-bottom-xxl text-centered">
        <h3>
          Wizyta z dnia {printDate(date)}
        </h3>
      </div>
      <DivideLine />
      <div className="p-l">
        <p className="text-centered">Dane klienta:</p>
        <p className="m-top-s m-bottom-s text-centered">
          <strong>{name} {surname}</strong>
        </p>
      </div>
      <DivideLine />
      <div className="p-l">
        <p className="text-centered">Użyto parametrów:</p>
        <p className="m-top-s m-bottom-s text-centered">
          <strong>{printParameters(parameters)}</strong>
        </p>
      </div>
      <DivideLine />
      <div className="p-l">
        <p className="text-centered">Metoda:</p>
        <p className="m-top-s m-bottom-s text-centered">
          <strong>{method}</strong>
        </p>
      </div>
      <DivideLine />
      <div className="p-l">
        <p className="text-centered">Cena:</p>
        <p className="m-top-s m-bottom-s text-centered">
          <strong>{price} zł</strong>
        </p>
      </div>
      <DivideLine />
      <div className="m-top-s p-top-l p-bottom-l">
        <p className="text-centered">Uwagi:</p>
        <p className={clsx(['m-top-l', 'm-bottom-l', comment && comment.length > 200 ? null : 'text-centered'])}>
          {
            comment || 'brak'
          }
        </p>
      </div>
      <DivideLine />
    </div>
  );
}

VisitInfo.propTypes = {
  clientId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  parameters: PropTypes.arrayOf(PropTypes.string).isRequired,
  method: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  comment: PropTypes.string,
  onStartDeleting: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
};
 
export default VisitInfo;