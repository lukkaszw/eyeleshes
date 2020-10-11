import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import VisitInfo from './components/VisitInfo';
import AskModal from '../../common/AskModal';
import AddEditOptions from '../../features/AddEditOptions';
import FastAddEditVisit from '../../features/FastAddEditVisit';

import SELECTORS from '../../../redux/selectors';
import { useQuery } from 'react-query';
import API from '../../../api';

import useDeleteVisit from './useDeleteVisit';
import useEditingVisit from './useEditingVisit';

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

  const {
    areOpenOptions,
    isFastEditing,
    handleOpenEditOptions,
    handleCloseEditOptions,
    handleStartFastEditing,
    handleStopFastEditing,
  } = useEditingVisit();

  const handleOpenFastEdit = useCallback(() => {
    handleCloseEditOptions();
    handleStartFastEditing();
  }, [handleCloseEditOptions, handleStartFastEditing]);


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
        onStartEditing={handleOpenEditOptions}
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
      <AddEditOptions 
        isOpen={areOpenOptions}
        onClose={handleCloseEditOptions}
        visitId={id}
        isForEdit
        onOpenFastModal={handleOpenFastEdit}
      />
      <FastAddEditVisit 
        token={token}
        isOpen={isFastEditing}
        onClose={handleStopFastEditing}
        visitId={id}
        isForEdit
        chosenClient={data.clientId}
        initialValues={{
          ...data,
          parameters: data.parameters.join('-'),
        }}
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