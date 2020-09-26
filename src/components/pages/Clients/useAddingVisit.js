import { useState, useCallback } from 'react';

const useAddingVisit = () => {
  const [clientForAddingVisit, setClient] = useState(null);

  const handleOpenAddingVisit = useCallback((clientData) => setClient(clientData), [setClient]);
  const handleCancelAddingVisit = useCallback(() => setClient(null), [setClient]);

  return {
    clientForAddingVisit,
    handleOpenAddingVisit,
    handleCancelAddingVisit,
  }
}

export default useAddingVisit;