import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './VisitsSorts.module.scss';
import { 
  faSortNumericDownAlt, 
  faSortNumericUpAlt,
  faHandHoldingUsd,
  faMoneyBill,
  faCalendar,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../common/Button';
import SmallPagination from '../../common/SmallPagination';

import PAGES from '../../../settings/pages';

const VisitsSorts = ({ 
  visitsAmount, page,
  sortCat, sortBy,
  onChangePage, onChangeSort,
}) => {

  const pagesAmount = useMemo(() => {
    return Math.ceil(visitsAmount / PAGES.VISITS.MAX_ON_PAGE)
  }, [ visitsAmount ]);

  const handlePrevPage = useCallback(() => onChangePage(page === 1 ? 1 : page - 1), [page, onChangePage]);
  const handleNextPage =  useCallback(() => onChangePage(page === pagesAmount ? pagesAmount : page + 1), [page, onChangePage, pagesAmount]);

  const handleClickSortDate = useCallback(() => {
    onChangeSort({
      sortCat: 'date',
      sortBy: sortBy === 'asc' ? 'desc' : 'asc',
    });
  }, [onChangeSort, sortBy]);

  const handleClickSortPrice = useCallback(() => {
    onChangeSort({
      sortCat: 'price',
      sortBy: sortBy === 'asc' ? 'desc' : 'asc',
    });
  }, [onChangeSort, sortBy]);

  const button1Icon = sortCat !== 'date' ? faCalendar :
    (sortBy === 'desc' ? faSortNumericDownAlt : faSortNumericUpAlt);
  
  const button2Icon = sortCat !== 'price' ? faDollarSign :
    (sortBy === 'desc' ?  faMoneyBill : faHandHoldingUsd);
  

  return ( 
    <div className={styles.root}>
      <div className={styles.btns}>
        <Button 
          icon={button1Icon}
          color={sortCat === 'date' ? 'primary' : 'secondary'}
          onClick={handleClickSortDate}
        />
        <Button 
          icon={button2Icon}
          color={sortCat === 'price' ? 'primary' : 'secondary'}
          onClick={handleClickSortPrice}
        />
      </div>
      <SmallPagination 
        onClickNext={handleNextPage}
        onClickPrev={handlePrevPage}
        page={page}
        pagesAmount={pagesAmount}
      />
    </div>
  );
}

VisitsSorts.propTypes = {
  visitsAmount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  sortCat: PropTypes.oneOf(['date', 'price']),
  sortBy: PropTypes.oneOf(['asc', 'desc']),
  onChangePage: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
};
 
export default VisitsSorts;