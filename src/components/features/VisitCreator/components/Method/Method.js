import React from 'react';
import PropTypes from 'prop-types';
import styles from './Method.module.scss';
import SquareBtn from '../../../../common/SquareBtn';
import InputField from '../../../../common/InputField';

import { METHODS } from '../../../../../settings/parameters';


const Method = ({ currentMethod, onSetMethod, onChangeMethod }) => {
  return ( 
    <div className={styles.root}>
      <div>
        <h4 className="m-bottom-s m-top-s">Metoda:</h4>
        <div>
          {
            METHODS.map(method => (
              <SquareBtn
                key={method}
                isStretchable={true}
                isActive={currentMethod === method}
                onClick={() => onSetMethod(method)}
              >
                {method}
              </SquareBtn>
            ))
          }
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <p>Wpisz inną:</p>
        <div>
          <InputField 
            value={currentMethod}
            onChange={onChangeMethod}
            fullWidth 
          />
        </div>
      </div>
    </div>
  );
}

Method.propTypes = {
  currentMethod: PropTypes.string.isRequired,
  onChangeMethod: PropTypes.func.isRequired,
  onSetMethod: PropTypes.func.isRequired,
};
 
export default Method;