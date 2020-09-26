import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClientsList.module.scss';

import ClientItem from './components/ClientItem';

const ClientsList = ({ 
 clients, onAddVisit,
}) => {

  return ( 
    <div className={styles.root}>
      <ul className={styles.list}>
        {
          clients.map(client => (
            <ClientItem 
              onAddVisit={onAddVisit}
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
  onAddVisit: PropTypes.func.isRequired,
});
 
export default ClientsList;