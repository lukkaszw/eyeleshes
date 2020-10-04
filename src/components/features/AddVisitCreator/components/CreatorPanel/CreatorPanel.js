import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './CreatorPanel.module.scss';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Button from '../../../../common/Button';

const CreatorPanel = ({ allowedToNext, children }) => {

  const [board, setBoard] = useState(1);

  const handleGoToSecondBoard = useCallback(() => setBoard(2), [setBoard]);
  const handleGoToFirstBoard = useCallback(() => setBoard(1), [setBoard]);

  return ( 
    <div className={styles.root}>
      <div className={styles.bar}>
        <span className={clsx([styles.barPart, styles.active])}>
          Parametry
        </span>
        <span className={clsx([styles.barPart, board === 2 && styles.active])}>
          Dane
        </span>
      </div>
      <div className={clsx([styles.boards, board === 2 && styles.second])}>
        {children}
      </div>
      <div className={styles.btns}>
        <Button 
          icon={faChevronLeft}
          onClick={handleGoToFirstBoard}
          disabled={board === 1}
        />
        <Button 
          icon={faChevronRight}
          onClick={handleGoToSecondBoard}
          disabled={board === 2 || !allowedToNext}
        />
      </div>
    </div>
  );
}

CreatorPanel.propTypes = {
  allowedToNext: PropTypes.bool,
};
 
export default CreatorPanel;