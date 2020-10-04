import { useState, useCallback } from 'react';

const useParameters = () => {

  const [parameters, setResult] = useState([]);
  const [currentLength, setCurrentLength] = useState('');
  const [currentTwist, setCurrentTwist] = useState('');
  const [chosenPart, setChosenPart] = useState(null);

  const handleAddToResult = useCallback(() => {
    setResult(prevValue => prevValue.concat([`${currentLength}${currentTwist.toLowerCase()}`]));
    setCurrentTwist('');
    setCurrentLength('');
  }, [setResult, currentLength, currentTwist, setCurrentLength, setCurrentTwist]);

  
  const handleEditPart = useCallback(() => {
    setResult(prevValue => prevValue.map((value, index) => {
      if(index === chosenPart) {
        return `${currentLength}${currentTwist.toLowerCase()}`;
      } 
      return value;
    }))
    setCurrentLength('');
    setCurrentTwist('');
    setChosenPart(null);
  }, [chosenPart, currentLength, setCurrentTwist, setChosenPart, setCurrentLength, currentTwist]);

  const handleCancelChosenPart = useCallback(() => setChosenPart(null), [setChosenPart]);

  const handleSubmitCreator = useCallback(() => {
    if(chosenPart !== null) {
      handleEditPart();
      return;
    }
    handleAddToResult();
  }, [handleAddToResult, handleEditPart, chosenPart]);

  const handleGoBack = useCallback(() => {
    if(chosenPart !== null) {
      handleCancelChosenPart();
      return;
    }
    setResult(prevValue => prevValue.filter((value, index) => (index !== prevValue.length - 1)));
    setCurrentLength('');
    setCurrentTwist('');
  }, [chosenPart, handleCancelChosenPart, setResult, setCurrentLength, setCurrentTwist]);

  const handleRemoveChosen = useCallback(() => {
    setResult(prevValue => prevValue.filter((value, index) => index !== chosenPart));
    setChosenPart(null);
  }, [setChosenPart, setResult, chosenPart]);

  return {
    currentLength,
    currentTwist,
    parameters,
    chosenPart,
    setChosenPart,
    setCurrentLength,
    setCurrentTwist,
    handleGoBack,
    handleRemoveChosen,
    handleSubmitCreator,
  };
}

export default useParameters;