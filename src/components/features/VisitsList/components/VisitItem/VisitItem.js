import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import styles from './VisitItem.module.scss';

import Button from '../../../../common/Button';
import { printParameters } from '../../../../../utils/printParameters';
import { printDate } from '../../../../../utils/dateInternationalization';


const VisitItem = ({ parameters, method, thickness, date, price, _id }) => {
  return ( 
    <li className={styles.root}>
      <span className={styles.date}>
        {printDate(date, 'pl-PL')}
      </span>
      <span className={styles.parameters}>
        {printParameters(parameters)}
      </span>
      <span className={styles.thickness}>
        {thickness}
      </span>
      <span className={styles.method}>
        {method}
      </span>
      <span className={styles.price}>
        {price} zł
      </span>
      <span className={styles.actions}>
        <Button 
          icon={faBookReader}
          size="small"
          variant="fill"
          color="secondary"
          component={Link}
          to={`/visits/${_id}`}
        />
      </span>
    </li>
  );
}

VisitItem.propType = {
  _id: PropTypes.string.isRequired,
  parameters: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  thickness: PropTypes.string.isRequired,
};
 
export default VisitItem;