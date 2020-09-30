import React from 'react';
import PropTypes from 'prop-types';

import VisitsList from '../VisitsList';
import VisitsSorts from '../VisitsSorts';

import { useQuery } from 'react-query';
import API from '../../../api';

const VisitsData = ({ 
  token, clientId,
  page, sortBy, sortCat, yearFrom, yearTo,
  onChangePage, onChangeSort,
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

  return ( 
    <>
      <VisitsSorts 
        page={page}
        onChangePage={onChangePage}
        sortBy={sortBy}
        sortCat={sortCat}
        onChangeSort={onChangeSort}
        visitsAmount={amount}
      />
      <VisitsList 
        visits={visits}
      />
    </>
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
  onChangePage: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
};
 
export default VisitsData;