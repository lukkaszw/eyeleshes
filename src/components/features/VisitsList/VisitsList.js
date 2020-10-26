import React from 'react';
import PropTypes from 'prop-types';
import styles from './VisitsList.module.scss';

import NoResults from '../../common/NoResults';
import VisitItem from './components/VisitItem';

const VisitsList = ({ visits }) => {
  return ( 
    <ul className={styles.root}>
      {
        visits.length === 0 ?
        <NoResults />
        :
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