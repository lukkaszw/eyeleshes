import React from 'react';
import styles from './LoaderIndicator.module.scss';

import Loader from '../Loader';

const LoaderIndicator = () => {
  return ( 
    <div className={styles.root}>
      <Loader />
    </div>
  )
}
  
export default LoaderIndicator;