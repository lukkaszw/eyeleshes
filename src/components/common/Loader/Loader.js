import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return ( 
    <div className={styles.root}>
      <div className={styles.loaderOutter}></div>
      <div className={styles.loaderInner}></div>
    </div>
  );
}
 
export default Loader;