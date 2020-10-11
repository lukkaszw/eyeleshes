import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

import ClientDetails from './components/ClientDetails';
import TodayVisitAdd from '../../features/TodayVisitAdd';
import ClientStats from './components/ClientsStats';
import SuspenseErrorBundary from '../../common/SuspenseErrorBundary';
import ClientVisits from './components/ClientVisits';
import ClientSettings from './components/ClientSettings';
import FastAddEditVisit from '../../features/FastAddEditVisit';

import ACTION_CREATORS from '../../../redux/actionCreators';

const Client = ({ token, onResetQueries }) => {

  const mostUsed = useRef();

  const { id } = useParams();

  const { data } = useQuery(['client', { token, clientId: id } ], 
    API.clients.getOne,  
    { suspense: true }
  );

  useEffect(() => () => onResetQueries()
  , [onResetQueries]);

  const [isOpenAddingModal, setIsOpenAddingModal] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);

  const handleOpenAddingModal = useCallback(() => setIsOpenAddingModal(true), [setIsOpenAddingModal]);
  const handleCloseAddingModal = useCallback(() => setIsOpenAddingModal(false), [setIsOpenAddingModal]);
  const handleOpenSettings = useCallback(() => setAreSettingsOpen(true), [setAreSettingsOpen]);
  const handleCloseSettings = useCallback(() => setAreSettingsOpen(false), [setAreSettingsOpen]);

  return ( 
    <section className="m-top-x">
      <ClientDetails 
        {...data}
        onOpenSettings={handleOpenSettings}
        onOpenAddingModal={handleOpenAddingModal}
      />
      <TodayVisitAdd 
        token={token}
        clientId={id}
        refMostUsed={mostUsed}
      />
      <SuspenseErrorBundary>
        <ClientStats 
          token={token}
          clientId={id}
          refMostUsed={mostUsed}
        />
      </SuspenseErrorBundary>
      <ClientVisits 
        token={token}
        clientId={id}
      />
      <FastAddEditVisit 
        token={token}
        isOpen={isOpenAddingModal}
        onClose={handleCloseAddingModal}
        chosenClient={{
          _id: id,
          name: data.name,
          surname: data.surname,
        }}
      />
      <ClientSettings 
        isOpen={areSettingsOpen}
        onClose={handleCloseSettings}
        token={token}
        clientId={data._id}
        name={data.name}
        surname={data.surname}
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

const mapDispatchToProps = (dispatch) => ({
  onResetQueries: () => dispatch(ACTION_CREATORS.visits.resetQueries()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Client);