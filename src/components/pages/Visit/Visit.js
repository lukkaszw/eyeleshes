import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import VisitInfo from './components/VisitInfo';
import AskModal from '../../common/AskModal';

import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

import useDeleteVisit from './useDeleteVisit';

const Visit = ({ token }) => {

  const { id } = useParams();

  const { data } = useQuery(['visit', { token, visitId: id } ], 
    API.visits.getOne,  
    { suspense: true }
  );

  const {
    isDeleting,
    isSending,
    handleStartDeleting,
    handleCancelDeleting,
    handleDelete,
  } = useDeleteVisit({ 
    token,
    visitId: data._id, 
    clientId: data.clientId._id,
  });


  return ( 
    <div className="m-top-xxl">
      <VisitInfo 
        clientId={data.clientId._id}
        name={data.clientId.name}
        surname={data.clientId.surname}
        parameters={data.parameters}
        date={data.date}
        price={data.price}
        comment={data.comment || null}
        createdAt={data.createdAt}
        onStartDeleting={handleStartDeleting}
      />
      <AskModal 
        isOpen={isDeleting}
        onClose={handleCancelDeleting}
        onYesAction={handleDelete}
        onNoAction={handleCancelDeleting}
        question="Czy jesteś pewien, że chcesz usunąć dane odnośnie tej wizyty?"
        yesLoading={isSending}
        yesDisabled={isSending}
        noDisabled={isSending}
      />
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