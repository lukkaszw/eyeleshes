import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import CreatorResult from './components/CreatorResult';
import Creator from './components/Creator';
import CreatorData from './components/CreatorData';
import CreatorPanel from './components/CreatorPanel';
import Method from './components/Method';

import useParameters from './useParameters';
import useMethod from './useMethod';
import useDataForm from './useDataForm';
import { useMutation, queryCache } from 'react-query';
import API from '../../../api';
import { toast } from 'react-toastify';
import TOASTS from '../../../utils/toasts.config';
import checkFieldsErrors from '../../../utils/checkFieldsErrors';

const VisitCreator = ({ 
  token,
  clientId, name, surname, 
  initialValues, isForEdit, visitId, 
}) => {

  const history = useHistory();

  const {
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
  } = useParameters({ 
    initialParameters: initialValues ? initialValues.parameters : null,
  });

  const {
    method,
    thickness,
    handleChangeMethod,
    handleSetMethod,
    handleChangeThickness,
    handleSetThickness,
    isMethodValid,
  } = useMethod({
    initialMethod: initialValues ? initialValues.method : null,
    initialThickness: initialValues ? initialValues.thickness : null,
  });

  const {
    fields,
    onChangeFor,
    handleOpenCalendar,
    handleCloseCalendar,
    isOpenCalendar,
  } = useDataForm({
    initialValues,
  });
  
  const apiAction = isForEdit ? API.visits.editVisit : API.visits.addVisit;

  //useMutation
  const [submitAction, { isLoading: isSending }] = useMutation(apiAction, {
    onSuccess: data => {
      queryCache.refetchQueries('stats');
      queryCache.refetchQueries('visits');
      queryCache.refetchQueries('clients');

      toast.success(isForEdit ? 'Poprawnie edytowano wizytę!' : 'Poprawnie dodano wizytę!', TOASTS.success);

      if(isForEdit) {
        queryCache.refetchQueries('visit');
        history.push(`/visits/${visitId}`);
      } else {
        history.push(`/clients/${clientId}`);
      }
      
    },
    onError: data => {
      toast.error(data.response.data.error, TOASTS.error);
    }
  });

  const isError = useMemo(() => checkFieldsErrors([fields.price, fields.comment]), [fields.price, fields.comment]);

  const handleSubmit = useCallback((e) => { 
    e.preventDefault();

    if(isError) return;

    const price = parseFloat(fields.price.value);
    const comment = fields.comment.value;
    const date = fields.date;

    submitAction({ token, parameters, method, thickness, price, comment, clientId, date, visitId });
  }, [isError, fields.price, fields.comment, fields.date, clientId, token, visitId, parameters, method, thickness, submitAction ]);

  return ( 
    <div className="m-top-xl">
      <CreatorResult 
        clientId={clientId}
        name={name}
        surname={surname}
        result={parameters}
        chosenPart={chosenPart}
        currentThickness={thickness}
        currentMethod={method}
        onSetChosenPart={setChosenPart}
      />
      <CreatorPanel 
        stepFilled={[parameters.length > 0, isMethodValid]}
      >
        <div>
          <Creator 
            currentLength={currentLength}
            currentTwist={currentTwist}
            chosenPart={chosenPart}
            onSetCurrentLength={setCurrentLength} 
            onSetCurrentTwist={setCurrentTwist}
            onCreatorBack={handleGoBack} 
            onCreatorSubmit={handleSubmitCreator} 
            onRemoveChosenPart={handleRemoveChosen}
          />
        </div>
        <div>
          <Method 
            currentMethod={method}
            currentThickness={thickness}
            onChangeMethod={handleChangeMethod}
            onSetMethod={handleSetMethod}
            onChangeThickness={handleChangeThickness}
            onSetThickness={handleSetThickness}
          />
        </div>
        <div>
          <CreatorData 
            isOpenCalendar={isOpenCalendar}
            onOpenCalendar={handleOpenCalendar}
            onCloseCalendar={handleCloseCalendar}
            fields={fields}
            onChangeFor={onChangeFor}
            onSubmit={handleSubmit}
            isSending={isSending}
            isError={isError}
            isForEdit={isForEdit}
          />
        </div>
      </CreatorPanel>
    </div>
  );
}

VisitCreator.propTypes = {
  clientId: PropTypes.string,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  isForEdit: PropTypes.bool,
  visitId: PropTypes.string,
};
 
export default VisitCreator;