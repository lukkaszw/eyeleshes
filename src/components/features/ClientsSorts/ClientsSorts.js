import React from 'react';
import { faSortAlphaDown, faSortAlphaDownAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ClientsSorts.module.scss';

import Button from '../../common/Button';
import SmallPagination from '../../common/SmallPagination';


const ClientsSorts = () => {
  return ( 
    <div className={styles.root}>
      <div className={styles.btns}>
        <Button 
          icon={faSortAlphaDown}
          color="secondary"
          ariaLabel="sortuj"
        />
      </div>
      <SmallPagination />
    </div>
  );
}
 
export default ClientsSorts;