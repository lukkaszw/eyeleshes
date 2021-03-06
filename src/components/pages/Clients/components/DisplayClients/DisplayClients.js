import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SELECTORS from '../../../../../redux/selectors';
import ACTION_CREATORS from '../../../../../redux/actionCreators';

import ClientsFilters from '../../../../features/ClientsFilters';
import ClientsSorts from '../../../../features/ClientsSorts';
import ClientsList from '../../../../features/ClientsList';

import useClientsFilters from '../../useClientsFilter';

const DisplayClients = ({ 
  token, data,
  sortBy, page, searchBy,
  onChangeSortBy, onChangePage, onChangeSearchBy,
  onStartAdding, onAddVisit,
}) => {

  const { clientsOnPage, pagesAmount  } = useClientsFilters({ data, sortBy, searchBy, page });
  
  return ( 
    <>
      <div className="m-top-xxl m-bottom-l">
        <ClientsFilters 
          onChangeSearchBy={onChangeSearchBy}
          searchBy={searchBy}
          onStartAdding={onStartAdding}
        />
        <ClientsSorts 
          sortBy={sortBy}
          onChangePage={onChangePage}
          onChangeSortBy={onChangeSortBy}
          page={page}
          pagesAmount={pagesAmount}
        />
      </div>
      <ClientsList 
        onAddVisit={onAddVisit}
        clients={clientsOnPage}
        token={token}
        page={page}
        searchBy={searchBy}
        sortBy={sortBy}
        onChangeSortBy={onChangeSortBy}
        onChangePage={onChangePage}
      />
    </>
   );
}

DisplayClients.propTypes = {
  data: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired, 
  page: PropTypes.number.isRequired, 
  searchBy: PropTypes.string.isRequired,
  onChangeSortBy: PropTypes.func.isRequired, 
  onChangePage: PropTypes.func.isRequired, 
  onStartAdding: PropTypes.func.isRequired,
  onAddVisit: PropTypes.func.isRequired,
  onChangeSearchBy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortBy: SELECTORS.clients.getSortBy(state),
  page: SELECTORS.clients.getPage(state),
  searchBy: SELECTORS.clients.getSearchBy(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page) => dispatch(ACTION_CREATORS.clients.setPage(page)),
  onChangeSortBy: (sortBy) => dispatch(ACTION_CREATORS.clients.setSortBy(sortBy)),
  onChangeSearchBy: (searchBy) => dispatch(ACTION_CREATORS.clients.setSearchBy(searchBy)),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(DisplayClients);