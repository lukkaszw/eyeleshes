import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import VisitCreator from '../../features/VisitCreator';

import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

const EditVisit = ({ token }) => {

  const { id } = useParams();

  const { data } = useQuery(['visit', { token, visitId: id } ], 
    API.visits.getOne,  
    { suspense: true }
  );

  return ( 
    <VisitCreator 
      token={token}
      clientId={data.clientId._id}
      name={data.clientId.name}
      surname={data.clientId.surname}
      initialValues={data}
      visitId={id}
      isForEdit
    />
  );
}

EditVisit.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});
 
export default connect(mapStateToProps)(EditVisit);