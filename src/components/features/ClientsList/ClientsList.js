import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import styles from './ClientsList.module.scss';

import ClientItem from './components/ClientItem';

import API from '../../../api';

const ClientsList = ({ token }) => {

  const { data } = useQuery(['clients', { token } ], 
    API.clients.getAll,  
    { suspense: true, cacheTime: 0 }
  );


  return ( 
    <div className={styles.root}>
      <ul className={styles.list}>
        {
          data.map(client => (
            <ClientItem 
              key={client._id}
              {...client}
            />
          ))
        }
      </ul>
    </div>
  );
}

ClientsList.propTypes = ({
  token: PropTypes.string.isRequired,
});
 
export default ClientsList;