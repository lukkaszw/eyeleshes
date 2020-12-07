import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { faCalendarCheck, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './FillByLastVisit.module.scss';

import Button from '../../common/Button';

const FillByLastVisit = ({ lastVisitData, onFillFields, onResetFields }) => {

  const handleFillFields = () => {
    onFillFields(lastVisitData);
  };

  useEffect(() => () => onFillFields({ method: '', parameters: [], thickness: '' }), [onFillFields]);

  return ( 
    <div className={styles.root}>
      <span className='m-right-s'>
        <Button 
          ariaLabel="Resetuj dane"
          icon={faMinusCircle}
          onClick={onResetFields}
          color="secondary"
        />
      </span>
      <Button 
        ariaLabel="Uzupełnij danymi z ostatniej wizyty"
        icon={faCalendarCheck}
        onClick={handleFillFields}
      />
    </div>
  );
}

FillByLastVisit.propTypes = {
  lastVisitData: PropTypes.object.isRequired,
  onFillFields: PropTypes.func.isRequired,
  onResetFields: PropTypes.func.isRequired,
}
 
export default FillByLastVisit;