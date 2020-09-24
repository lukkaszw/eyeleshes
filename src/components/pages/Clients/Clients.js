import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SELECTORS from '../../../redux/selectors';

import API from '../../../api';
import { useQuery } from 'react-query';

import DisplayClients from './components/DisplayClients';


const Clients = ({ 
  token,
}) => {

  const { data } = useQuery(['clients', { token } ], 
    API.clients.getAll,  
    { suspense: true }
  );
  
  return ( 
    <DisplayClients 
      data={data}
      token={token}
    />
  );
}

Clients.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});
 
export default connect(mapStateToProps)(Clients);