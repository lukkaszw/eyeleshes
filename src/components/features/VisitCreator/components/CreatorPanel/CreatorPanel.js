import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './CreatorPanel.module.scss';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Button from '../../../../common/Button';

const CreatorPanel = ({ stepFilled, children }) => {

  const [board, setBoard] = useState(1);

  const handleGoToNextBoard = useCallback(() => setBoard(prevValue => prevValue < 3 ? prevValue + 1 : 3), [setBoard]);
  const handleGoToPrevBoard = useCallback(() => setBoard(prevValue => prevValue > 1 ? prevValue - 1 : 1), [setBoard]);

  const isAllowedToNext = (board === 1 && stepFilled[0]) || (board === 2 && stepFilled[1]);

  return ( 
    <div className={styles.root}>
      <div className={styles.bar}>
        <span className={clsx([styles.barPart, styles.active])}>
          Parametry
        </span>
        <span className={clsx([styles.barPart, board > 1 && styles.active])}>
          Metoda
        </span>
        <span className={clsx([styles.barPart, board > 2 && styles.active])}>
          Dane
        </span>
      </div>
      <div className={clsx([styles.boards, board === 2 && styles.second, board === 3 && styles.third])}>
        {children}
      </div>
      <div className={styles.btns}>
        <Button 
          icon={faChevronLeft}
          onClick={handleGoToPrevBoard}
          disabled={board === 1}
        />
        <Button 
          icon={faChevronRight}
          onClick={handleGoToNextBoard}
          disabled={board === 3 || !isAllowedToNext}
        />
      </div>
    </div>
  );
}

CreatorPanel.propTypes = {
  stepFilled: PropTypes.array.isRequired,
};
 
export default CreatorPanel;