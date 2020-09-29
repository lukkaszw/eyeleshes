import React from 'react';
import PropTypes from 'prop-types';
import { faBookReader, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './VisitItem.module.scss';

import Button from '../../../../common/Button';
import { printParameters } from '../../../../../utils/printParameters';
import { printDate } from '../../../../../utils/dateInternationalization';


const VisitItem = ({ parameters, date, price, _id }) => {
  return ( 
    <li className={styles.root}>
      <span>
        {printDate(date, 'pl-PL')}
      </span>
      <span>
        {printParameters(parameters)}
      </span>
      <span className={styles.price}>
        {price} zł
      </span>
      <span className={styles.actions}>
        <Button 
          icon={faTimes}
          size="small"
        />
        <Button 
          icon={faBookReader}
          size="small"
          variant="fill"
          color="secondary"
        />
      </span>
    </li>
  );
}

VisitItem.propType = {
  _id: PropTypes.string.isRequired,
  parameters: PropTypes.string.isRequired,
  
};
 
export default VisitItem;