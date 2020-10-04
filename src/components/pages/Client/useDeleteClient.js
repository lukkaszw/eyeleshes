import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';
import API from '../../../api';
import { useMutation, queryCache } from 'react-query';

const useDeleteClient = ({ token, clientId }) => {

  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStartDeleting = useCallback(() => setIsDeleting(true), [setIsDeleting]);
  const handleCancelDeleting = useCallback(() => setIsDeleting(false), [setIsDeleting]);

    //useMutation
  const [deleteClient, { isLoading: isSending }] = useMutation(API.clients.deleteClient, {
    onSuccess: data => {
      queryCache.refetchQueries('clients');
      toast.success(`Usunięto klienta: ${data.name} ${data.surname}!`, TOASTS.success);
      history.push('/clients');
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
    }
  });

  const handleDelete = useCallback(() => deleteClient({ token, clientId }), 
  [deleteClient, token, clientId ]);

  return {
    isDeleting,
    isSending,
    handleCancelDeleting,
    handleStartDeleting,
    handleDelete,
  };
}

export default useDeleteClient;