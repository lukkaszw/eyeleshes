import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SELECTORS from '../../../redux/selectors';

import SuspenseErrorBundary from '../../common/SuspenseErrorBundary';
import ClientsFilters from '../../features/ClientsFilters';
import ClientsList from '../../features/ClientsList';

const Clients = ({ token }) => {
  return ( 
    <div>
      <ClientsFilters />
      <SuspenseErrorBundary>
        <ClientsList 
          token={token}
        />
      </SuspenseErrorBundary>
    </div>
   );
}

Clients.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});

const mapDispatchToProps = (dispatch) => ({

});
 
export default connect(mapStateToProps, mapDispatchToProps)(Clients);