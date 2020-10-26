import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

import VisitCreator from '../../features/VisitCreator';
import MobileNav from '../../layout/MobileNav';

import { ADD_VISIT_PAGE_LINKS } from '../../../settings/navigationLinks';

const AddVisit = ({ token }) => {

  const { id } = useParams();

  
  const { data } = useQuery(['client', { token, clientId: id } ], 
    API.clients.getOne,  
    { suspense: true }
  );

  return ( 
    <>
      <VisitCreator 
        token={token}
        clientId={id}
        {...data}
      />
      <MobileNav 
        navActions={ADD_VISIT_PAGE_LINKS}
      />
    </>
  );
}

AddVisit.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});
 
export default connect(mapStateToProps)(AddVisit);