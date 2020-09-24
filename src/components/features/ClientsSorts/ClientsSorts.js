import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { faSortAlphaDown, faSortAlphaDownAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ClientsSorts.module.scss';

import Button from '../../common/Button';
import SmallPagination from '../../common/SmallPagination';

const ClientsSorts = ({ page, pagesAmount, sortBy, onChangeSortBy, onChangePage }) => {

  const handleChangeSortBy = useCallback(() => onChangeSortBy(sortBy === 'asc' ? 'desc' : 'asc'), 
    [onChangeSortBy, sortBy]
  );

  const handleNextPage = useCallback(() => onChangePage(page < pagesAmount ? page + 1 : pagesAmount), 
    [onChangePage, page, pagesAmount]
);
  const handlePrevPage = useCallback(() => onChangePage(page > 1 ? page - 1 : 1), 
    [onChangePage, page]
);

  return ( 
    <div className={styles.root}>
      <div className={styles.btns}>
        <Button 
          icon={sortBy === 'asc' ? faSortAlphaDown : faSortAlphaDownAlt}
          color="secondary"
          ariaLabel="sortuj"
          onClick={handleChangeSortBy}
        />
      </div>
      <SmallPagination 
        page={page}
        pagesAmount={pagesAmount}
        onClickNext={handleNextPage}
        onClickPrev={handlePrevPage}
      />
    </div>
  );
}

ClientsSorts.propTypes = {
  page: PropTypes.number.isRequired,
  pagesAmount: PropTypes.number.isRequired,
  sortBy: PropTypes.oneOf(['asc', 'desc']),
  onChangeSortBy: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
}
 
export default ClientsSorts;