import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './FillByLastVisit.module.scss';

import Button from '../../common/Button';

const FillByLastVisit = ({ lastVisitData, onFillFields, onResetFields }) => {

  const handleFillFields = () => {
    onFillFields(lastVisitData);
  };

  useEffect(() => () => onResetFields(), [onResetFields]);

  return ( 
    <div className={styles.root}>
      <Button 
        size="small"
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