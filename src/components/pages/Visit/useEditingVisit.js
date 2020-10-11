import { useState, useCallback } from 'react';

const useEditingVisit = () => {

  const [areOpenOptions, setAreOpenOptions] = useState(false);
  const [isFastEditing, setIsFastEditing] = useState(false);

  const handleOpenEditOptions = useCallback(() => setAreOpenOptions(true), [setAreOpenOptions]);
  const handleCloseEditOptions = useCallback(() => setAreOpenOptions(false), [setAreOpenOptions]);
  const handleStartFastEditing = useCallback(() => setIsFastEditing(true), [setIsFastEditing]);
  const handleStopFastEditing = useCallback(() => setIsFastEditing(false), [setIsFastEditing]);

  return {
    areOpenOptions,
    isFastEditing,
    handleOpenEditOptions,
    handleCloseEditOptions,
    handleStartFastEditing,
    handleStopFastEditing
  };
}


export default useEditingVisit;

