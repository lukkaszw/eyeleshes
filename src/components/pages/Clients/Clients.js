import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SELECTORS from '../../../redux/selectors';

import API from '../../../api';
import { useQuery } from 'react-query';

import DisplayClients from './components/DisplayClients';
import AddEditClient from '../../features/AddEditClient';
import FastAddVisit from '../../features/FastAddVisit';

import useAddingClient from './useAddingClient';
import useAddingVisit from './useAddingVisit';


const Clients = ({ 
  token,
}) => {

  const { data } = useQuery(['clients', { token } ], 
    API.clients.getAll,  
    { suspense: true }
  );

  const {
    isAddingClient,
    handleOpenAddingClient,
    handleCloseAddingClient,
  } = useAddingClient();

  const {
    clientForAddingVisit,
    handleOpenAddingVisit,
    handleCancelAddingVisit,
  } = useAddingVisit();
  
  return ( 
    <>
      <DisplayClients 
        data={data}
        onAddVisit={handleOpenAddingVisit}
        token={token}
        onStartAdding={handleOpenAddingClient}
      />
      <AddEditClient 
        token={token}
        existingClients={data}
        isOpen={isAddingClient}
        onClose={handleCloseAddingClient}
      />
      <FastAddVisit 
        token={token}
        isOpen={!!clientForAddingVisit}
        chosenClient={clientForAddingVisit}
        onClose={handleCancelAddingVisit}
      />
    </>
  );
}

Clients.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});
 
export default connect(mapStateToProps)(Clients);