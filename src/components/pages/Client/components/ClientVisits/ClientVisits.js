import React from 'react';
import PropTypes from 'prop-types';

import VisitsFilters from '../../../../features/VisitsFilters';
import VisitsData from '../../../../features/VisitsData';
import SuspenseErrorBundary from '../../../../common/SuspenseErrorBundary';

const ClientVisits = ({ token, clientId }) => {
  return ( 
    <div>
      <VisitsFilters />
      <SuspenseErrorBundary>
        <VisitsData 
          token={token}
          clientId={clientId}
        />
      </SuspenseErrorBundary>
    </div>
  );
}
 
ClientVisits.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

export default ClientVisits;