import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClientStats.module.scss';

import { useQuery } from 'react-query';
import API from '../../../../../api';
import { printParameters } from '../../../../../utils/printParameters';
import { printDate } from '../../../../../utils/dateInternationalization';

const ClientStats = ({ token, clientId, refMostUsed }) => {

  const { data } = useQuery(['stats', { token, clientId } ], 
  API.visits.getStats,  
  { suspense: true }
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
              `${printParameters(lastVisit.parameters)} / ${lastVisit.method}`
              :
              '-'
            }
          </span>
        </p>
        <p className={styles.dependent}>
          <span className={styles.option}>
            W dniu:
          </span>
          <span>
            {
              lastVisit ?
                printDate(lastVisit.date)
              :
              '-'
            }
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Najczęściej:
          </span>
          <span ref={refMostUsed}>
            {
              mostCommonVisit ?
              printParameters(mostCommonVisit.parameters)
              :
              '-'
            }
          </span>
        </p>
        <p className={styles.dependent}>
          <span className={styles.option}>
            Użyto:
          </span>
          <span>
            {
              mostCommonVisit ?
              `${mostCommonVisit.count} razy`
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
        <p className={styles.dependent}>
          <span className={styles.option}>
            W tym roku: 
          </span>
          <span>
            {thisYearAmount}
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Łączna kwota: 
          </span>
          <span>
            {totalCost.toFixed(2)} zł
          </span>
        </p>
        <p className={styles.dependent}>
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