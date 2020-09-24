import React from 'react';
import PropTypes from 'prop-types';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './SmallPagination.module.scss';

import Button from '../../common/Button';

const SmallPagination = ({ onClickPrev, onClickNext, page, pagesAmount }) => {
  return ( 
    <div className={styles.root}>
      <Button 
        icon={faAngleLeft}
        color="secondary"
        variant="fill"
        ariaLabel="poprzednia strona"
        onClick={onClickPrev}
      />
      <span className={styles.pages}>
        {page}/{pagesAmount}
      </span>
      <Button 
        icon={faAngleRight}
        color="secondary"
        variant="fill"
        ariaLabel="nastepna strona"
        onClick={onClickNext}
      />
    </div>
  );
}

SmallPagination.propTypes = {
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pagesAmount: PropTypes.number.isRequired,
};
 
export default SmallPagination;