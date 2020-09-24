import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ClientItem.module.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../common/Button';

import { printDate } from '../../../../../utils/dateInternationalization';
import { printParameters } from '../../../../../utils/printParameters';

const ClientItem = ({ _id, name, surname, lastVisit }) => {
  return ( 
    <li className={styles.root}>
      <Link 
        className={styles.link} 
        to={`/clients/${_id}`}
      >
        <span className={styles.name}>{surname} {name}</span>
        <span className={styles.lastVisit}>
          {
            lastVisit ?
              <span  className={styles.date}>
                ostatnia wizyta: {printDate(lastVisit.date, 'pl-PL')} ( {printParameters(lastVisit.parameters)})
              </span>
              :
              'brak dotychczasowych wizyt'
          }
        </span>
      </Link>
      <span className={styles.iconButton}>
        <Button 
          icon={faPlus}
        />
      </span>
    </li>
  );
}

ClientItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  lastVisit: PropTypes.object,
};
 
export default ClientItem;