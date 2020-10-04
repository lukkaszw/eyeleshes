import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CreatorResult.module.scss';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import SquareBtn from '../../../../common/SquareBtn';
import Button from '../../../../common/Button';

const CreatorResult = ({ clientId, name, surname, result, chosenPart, onSetChosenPart }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.name}>
        <Button 
          ariaLabel="Wróć do strony klienta"
          icon={faReply}
          component={Link}
          to={`/clients/${clientId}`}
          color="secondary"
        />
        <h3 className="m-left-l">
          {name} {surname}
        </h3>
      </div>
      <div className="text-centered">
        <img className={styles.photo} src="/images/eye-map.png" alt="mapa oka" />
      </div>
      <div className={styles.result}>
          <p>
            {result.map((parametr, index) => (
              <SquareBtn
                key={index}
                isActive={index === chosenPart}
                onClick={() => onSetChosenPart(chosenPart === index ? null : index)}
              >
                {parametr}
              </SquareBtn>
            ))}
          </p>
      </div>
    </div>
  );
}

CreatorResult.propTypes = {
  clientId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.string),
  chosenPart: PropTypes.bool,
  onSetChosenPart: PropTypes.func.isRequired,
}
 
export default CreatorResult;