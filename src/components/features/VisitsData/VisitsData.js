import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import VisitsList from '../VisitsList';

import { useQuery } from 'react-query';
import API from '../../../api';
import PAGES from '../../../settings/pages';

const VisitsData = ({ 
  token, clientId,
  page, sortBy, sortCat, yearFrom, yearTo,
  onChangePagesAmount,
 }) => {

  const { data: { visits, amount } } = useQuery(
    ['visits', { 
        token, clientId,
        page, sortBy, sortCat, yearFrom, yearTo,
      }
    ], 
    API.visits.getAll,  
    { suspense: true, cacheTime: 0 }
  );

  useEffect(() => {
    const pagesAmount = Math.ceil(amount / PAGES.VISITS.MAX_ON_PAGE);
    onChangePagesAmount(pagesAmount);
  }, [amount, onChangePagesAmount]);

  return ( 
    <VisitsList 
      visits={visits}
    />
  );
}

VisitsData.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string,
  page: PropTypes.number.isRequired,
  sortCat: PropTypes.oneOf(['date', 'price']),
  sortBy: PropTypes.oneOf(['asc', 'desc']),
  yearFrom: PropTypes.string,
  yearTo: PropTypes.string,
  onChangePagesAmount: PropTypes.func.isRequired,
};
 
export default VisitsData;