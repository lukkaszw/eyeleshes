import { useState, useCallback } from 'react';

const useAddingClient = () => {
  const [isAddingClient, setIsAdding] = useState(false);

  const handleOpenAddingClient = useCallback(() => setIsAdding(true), [setIsAdding]);
  const handleCloseAddingClient = useCallback(() => setIsAdding(false), [setIsAdding]);

  return {
    isAddingClient,
    handleOpenAddingClient,
    handleCloseAddingClient,
  }
}

export default useAddingClient;