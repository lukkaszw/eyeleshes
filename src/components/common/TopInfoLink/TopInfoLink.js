import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';

import styles from './TopInfoLink.module.scss';

const TopInfoLink = ({ link, text, ariaLabel }) => {
  return ( 
    <div className={styles.root}>
      <Button 
        ariaLabel={ariaLabel}
        icon={faReply}
        component={Link}
        to={link}
        color="secondary"
      />
      <h3 className="m-left-l">
        {text}
      </h3>
    </div>
  );
}

TopInfoLink.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
};
 
export default TopInfoLink;