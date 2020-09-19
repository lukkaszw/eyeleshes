import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainContent.module.scss';

import Button from '../../../../common/Button';

const MainContent = () => {
  return ( 
    <div className={styles.root}>
      <h1 className={styles.title}>
        EyelashNote
      </h1>
      <p className={styles.description}>
        Pozwól nam dokumentować. 
        <span className={styles.descriptionPart2}> Sama skup się na tym co ważne!</span>
      </p>
      <Button
        to='/auth'
        component={Link}
        size="big"
      >
        Zaloguj się
      </Button>
    </div>
  );
}
 
export default MainContent;