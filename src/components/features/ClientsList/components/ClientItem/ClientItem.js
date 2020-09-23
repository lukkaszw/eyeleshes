import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ClientItem.module.scss';

const ClientItem = ({ _id, name, surname }) => {
  return ( 
    <li className={styles.root}>
      <Link 
        className={styles.link} 
        to={`/clients/${_id}`}
      >
        {surname} {name}
      </Link>
    </li>
  );
}

ClientItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
 
export default ClientItem;