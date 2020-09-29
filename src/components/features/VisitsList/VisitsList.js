import React from 'react';
import PropTypes from 'prop-types';
import styles from './VisitsList.module.scss';

import VisitItem from './components/VisitItem';

const VisitsList = ({ visits }) => {
  return ( 
    <ul className={styles.root}>
      {
        visits.map(visit => (
          <VisitItem 
            key={visit._id}
            {...visit}
          />
        ))
      }
    </ul>
  );
}

VisitsList.propTypes = {
  visits: PropTypes.array.isRequired,
};
 
export default VisitsList;