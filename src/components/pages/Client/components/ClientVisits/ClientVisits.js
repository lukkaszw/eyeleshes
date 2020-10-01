import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisitsFilters from '../../../../features/VisitsFilters';
import VisitsData from '../../../../features/VisitsData';
import SuspenseErrorBundary from '../../../../common/SuspenseErrorBundary';
import VisitsSorts from '../../../../features/VisitsSorts';

import SELECTORS from '../../../../../redux/selectors';
import ACTION_CREATORS from '../../../../../redux/actionCreators';

const ClientVisits = ({ 
  token, clientId,
  page, sortCat, sortBy, yearFrom, yearTo, pagesAmount,
  onChangePage, onChangeSort, onChangeYears, onChangePagesAmount,
}) => {
  return ( 
    <div>
      <VisitsFilters 
        onChangeYears={onChangeYears}
        yearFrom={yearFrom}
        yearTo={yearTo}
      />
      <VisitsSorts 
        page={page}
        onChangePage={onChangePage}
        sortBy={sortBy}
        sortCat={sortCat}
        onChangeSort={onChangeSort}
        pagesAmount={pagesAmount}
      />
      <SuspenseErrorBundary>
        <VisitsData 
          token={token}
          clientId={clientId}
          page={page}
          sortCat={sortCat}
          sortBy={sortBy}
          yearFrom={yearFrom}
          yearTo={yearTo}
          onChangePagesAmount={onChangePagesAmount}
        />
      </SuspenseErrorBundary>
    </div>
  );
}
 
ClientVisits.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  sortCat: PropTypes.oneOf(['date', 'price']),
  sortBy: PropTypes.oneOf(['asc', 'desc']),
  yearFrom: PropTypes.string,
  yearTo: PropTypes.string,
  pagesAmount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onChangeYears: PropTypes.func.isRequired,
  onChangePagesAmount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  page: SELECTORS.visits.getPage(state),
  sortCat: SELECTORS.visits.getSortCat(state),
  sortBy: SELECTORS.visits.getSortBy(state),
  yearFrom: SELECTORS.visits.getYearFrom(state),
  yearTo: SELECTORS.visits.getYearTo(state),
  pagesAmount: SELECTORS.visits.getPagesAmount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page) => dispatch(ACTION_CREATORS.visits.setPage(page)),
  onChangeSort: ({sortCat, sortBy}) => dispatch(ACTION_CREATORS.visits.setSort({ sortCat, sortBy })),
  onChangeYears: ({ yearFrom, yearTo }) => dispatch(ACTION_CREATORS.visits.setYears({
    yearFrom, yearTo,
  })),
  onChangePagesAmount: (pagesAmount) => dispatch(ACTION_CREATORS.visits.setPagesAmount(pagesAmount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientVisits);