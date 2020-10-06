import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';
import API from '../../../api';
import { useMutation, queryCache } from 'react-query';

const useDelete = ({ token, clientId, visitId }) => {

  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStartDeleting = useCallback(() => setIsDeleting(true), [setIsDeleting]);
  const handleCancelDeleting = useCallback(() => setIsDeleting(false), [setIsDeleting]);

  //useMutation
  const [deleteVisit, { isLoading: isSending }] = useMutation(API.visits.deleteVisit, {
    onSuccess: data => {
      queryCache.refetchQueries('visits');
      queryCache.refetchQueries('stats');
      queryCache.refetchQueries('clients');
      toast.success(`Poprawnie usunięto wizytę!`, TOASTS.success);
      history.push(`/clients/${clientId}`);
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
    }
  });

  const handleDelete = useCallback(() => deleteVisit({ token, visitId }), 
  [deleteVisit, token, visitId ]);

  return {
    isDeleting,
    isSending,
    handleStartDeleting,
    handleCancelDeleting,
    handleDelete,
  };
}

export default useDelete;