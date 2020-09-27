import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

import ClientDetails from './components/ClientDetails';

const Client = ({ token }) => {

  const { id } = useParams();

  const { data } = useQuery(['client', { token, clientId: id } ], 
    API.clients.getOne,  
    { suspense: true }
  );

  return ( 
    <section className="m-top-x">
      <ClientDetails 
        {...data}
      />
    </section>
  );
}

Client.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});
 
export default connect(mapStateToProps)(Client);