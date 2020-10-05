import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

const Visit = ({ token }) => {

  const { id } = useParams();

  const { data } = useQuery(['client', { token, visitId: id } ], 
    API.visits.getOne,  
    { suspense: true }
  );


  return ( 
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

Visit.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});
 
export default connect(mapStateToProps)(Visit);