import React from 'react';
import styles from './ClientStats.module.scss';

const ClientStats = ({ clientId }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.part}>
        <p className={styles.centered}>
          <span className={styles.option}>
            Ostatnio:
          </span>
          <span>
            12-14-15-15-14-12-10
          </span>
        </p>
        <p className={styles.centered}>
          <span className={styles.option}>
            Najczęściej:
          </span>
          <span>
            11-13-14-16-14-12-10
          </span>
        </p>
      </div>
      <div className={styles.part}>
        <p>
          <span className={styles.option}>
            Łącznie wizyt: 
          </span>
          <span>
            22
          </span>
        </p>
        <p>
          <span className={styles.option}>
            W tym roku: 
          </span>
          <span>
            3
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Łączna kwota: 
          </span>
          <span>
            2200 zł
          </span>
        </p>
        <p>
          <span className={styles.option}>
            Średni koszt:
          </span>
          <span>
            220 zł
          </span>
        </p>
      </div>
    </div>
  );
}
 
export default ClientStats;