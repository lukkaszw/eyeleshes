import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClientStats.module.scss';

import { useQuery } from 'react-query';
import API from '../../../../../api';
import { printParameters } from '../../../../../utils/printParameters';

const ClientStats = ({ token, clientId }) => {

  const { data } = useQuery(['stats', { token, clientId } ], 
  API.visits.getStats,  
  { suspense: true, cacheTime: 0 }
);

  const {
    lastVisit,
    totalAmount,
    totalCost,
    averageCost,
    thisYearAmount,
    mostCommonVisit,
  } = data;

  return ( 
    <div className={styles.root}>
      <div className={styles.part}>
        <p>
          <span className={styles.option}>
            Ostatnio:
          </span>
          <span>
            {
              lastVisit ?
              printParameters(lastVisit)
              :
              '-'
            }
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Najczęściej:
          </span>
          <span>
            {
              mostCommonVisit ?
              printParameters(mostCommonVisit)
              :
              '-'
            }
          </span>
        </p>
      </div>
      <div className={styles.part}>
        <p>
          <span className={styles.option}>
            Łącznie wizyt: 
          </span>
          <span>
            {totalAmount}
          </span>
        </p>
        <p>
          <span className={styles.option}>
            W tym roku: 
          </span>
          <span>
            {thisYearAmount}
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Łącznie wydałą: 
          </span>
          <span>
            {totalCost.toFixed(2)} zł
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Średnio/wizytę:
          </span>
          <span>
            {averageCost.toFixed(2)} zł
          </span>
        </p>
      </div>
    </div>
  );
}

ClientStats.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};
 
export default ClientStats;