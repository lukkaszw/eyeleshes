import React from 'react';
import styles from './Error.module.scss';

const Error = ({ children }) => {
  return ( 
    <h3 className={styles.root}>
      {children}
    </h3>
  );
}
 
export default Error;