import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './CreatorResult.module.scss';

import SquareBtn from '../../../../common/SquareBtn';
import TopInfoLink from '../../../../common/TopInfoLink';

const CreatorResult = memo(function CreatorResult({ clientId, name, surname, result, chosenPart, onSetChosenPart, currentThickness, currentMethod }) {
  return ( 
    <div className={styles.root}>
      <TopInfoLink 
        ariaLabel="Wróć do strony klienta"
        link={`/clients/${clientId}`}
        text={`${name} ${surname}`}
      />
      <div className={styles.photoWrapper}>
        <div className={styles.currentThickness}>
          <p>Grubość:</p>
          <p>{currentThickness || '-'}</p>
        </div>
        <img className={styles.photo} src="/images/eye-map.png" alt="mapa oka" />
        <div className={styles.currentMethod}>
          <p>Metoda:</p>
          <p>{currentMethod || '-'}</p>
        </div>
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
});

CreatorResult.propTypes = {
  clientId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.string),
  chosenPart: PropTypes.number,
  onSetChosenPart: PropTypes.func.isRequired,
  currentMethod: PropTypes.string,
  currentThickness: PropTypes.string,
}
 
export default CreatorResult;