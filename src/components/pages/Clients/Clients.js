import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SELECTORS from '../../../redux/selectors';

import API from '../../../api';
import { useQuery } from 'react-query';

import DisplayClients from './components/DisplayClients';
import AddClient from '../../features/AddClient';


const Clients = ({ 
  token,
}) => {

  const { data } = useQuery(['clients', { token } ], 
    API.clients.getAll,  
    { suspense: true }
  );

  const [isAdding, setIsAdding] = useState(false);

  const handleOpenAddingModal = useCallback(() => setIsAdding(true), [setIsAdding]);
  const handleCloseAddingModal = useCallback(() => setIsAdding(false), [setIsAdding]);
  
  return ( 
    <>
      <DisplayClients 
        data={data}
        token={token}
        onStartAdding={handleOpenAddingModal}
      />
      <AddClient 
        token={token}
        existingClients={data}
        isOpen={isAdding}
        onClose={handleCloseAddingModal}
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