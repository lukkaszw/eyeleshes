import React from 'react';
import PropTypes from 'prop-types';

import VisitsList from '../VisitsList';
import VisitsSorts from '../../features/VisitsSorts';
import LoaderIndicator from '../../common/LoaderIndicator';

import { useQuery } from 'react-query';
import API from '../../../api';

const VisitsData = ({ 
  token, clientId,
  page, sortBy, sortCat, yearFrom, yearTo,
  onChangeSort, onChangePage,
 }) => {


  const { data , isLoading } = useQuery(
    ['visits', { 
        token, clientId,
        page, sortBy, sortCat, yearFrom, yearTo,
      }
    ], 
    API.visits.getAll,  
    { suspense: false }
  );

  return (
    <>
      <VisitsSorts 
        page={page}
        onChangePage={onChangePage}
        sortBy={sortBy}
        sortCat={sortCat}
        onChangeSort={onChangeSort}
        pagesAmount={data ? data.pages : null}
      />
      {
        isLoading ?
          <LoaderIndicator />
          :
          <VisitsList 
            visits={data ? data.visits : []}
          />
      }
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
  onChangeSort: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
 
export default VisitsData;