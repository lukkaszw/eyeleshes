import React, { memo } from 'react';
import PropTypes from 'prop-types';

import AddEditClient from '../../../../features/AddEditClient';

import { useQuery } from 'react-query';
import API from '../../../../../api';

const EditClient = memo(function EditClient({ token, clientId, name, surname, isOpen, onClose }) {

  const { data } = useQuery(['clients', { token } ], 
    API.clients.getAll,  
    { suspense: true }
  );

  return ( 
    <AddEditClient 
      isOpen={isOpen}
      clientId={clientId}
      token={token}
      initialValues={{ 
        name,
        surname,
      }}
      existingClients={data}
      isForEdit
      onClose={onClose}
    />
  );
});

EditClient.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
 
export default EditClient;