import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Creator.module.scss';

import SquareBtn from '../../../../common/SquareBtn';
import Button from '../../../../common/Button';

import { LENGTHS, TWISTS } from '../../../../../settings/parameters';

const Creator = memo(function Creator({
  currentLength, currentTwist, chosenPart,
  onSetCurrentLength, onSetCurrentTwist,
  onCreatorBack, onCreatorSubmit, onRemoveChosenPart,
}) {
  return ( 
    <div className={styles.root}>
      <div>
        <h4 className="m-bottom-s m-top-s">Długość rzęs:</h4>
        <div>
          {
            LENGTHS.map(length => (
              <SquareBtn
                key={length}
                isActive={currentLength === length}
                onClick={() => onSetCurrentLength(length)}
              >
                {length}
              </SquareBtn>
            ))
          }
        </div>
      </div>
      <div>
        <h4 className="m-bottom-s m-top-s">Skręt rzęs:</h4>
        <div>
          {
            TWISTS.map(twist => (
              <SquareBtn
                key={twist}
                isActive={currentTwist === twist}
                onClick={() => onSetCurrentTwist(currentTwist === twist ? '' : twist)}
              >
                {twist}
              </SquareBtn>
            ))
          }
        </div>
      </div>
      <div className={styles.btns}>
        <Button 
          color="secondary"
          onClick={onCreatorBack}
        >
          {
            chosenPart !== null ? 'Anuluj' : 'Cofnij'
          }
        </Button>
        <Button
          color="tertiary"
          disabled={!currentLength}
          onClick={onCreatorSubmit}
        >
          {
            chosenPart !== null ? 'Edytuj' : 'Dodaj'
          }
        </Button>
        <div className="m-top-m">
          {
            chosenPart !== null &&
              <Button
                size="small"
                color="secondary"
                onClick={onRemoveChosenPart}
              >
                Usuń zaznaczony
              </Button>
          }
        </div>  
      </div>
    </div>
  );
});

Creator.propTypes = {
  currentLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentTwist: PropTypes.string,
  chosenPart: PropTypes.number,
  onSetCurrentLength: PropTypes.func.isRequired,
  onSetCurrentTwist: PropTypes.func.isRequired,
  onRemoveChosenPart: PropTypes.func.isRequired,
  onCreatorSubmit: PropTypes.func.isRequired,
  onCreatorBack: PropTypes.func.isRequired,
};
 
export default Creator;