import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClientsList.module.scss';

import ClientItem from './components/ClientItem';

const ClientsList = ({ 
 clients,
}) => {

  return ( 
    <div className={styles.root}>
      <ul className={styles.list}>
        {
          clients.map(client => (
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
  clients: PropTypes.array.isRequired,
});
 
export default ClientsList;