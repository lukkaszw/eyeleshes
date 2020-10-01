import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './VisitsFilters.module.scss';

import Button from '../../common/Button';
import Modal from '../../common/Modal';
import InputField from '../../common/InputField';

import useFilters from './useFilters';

const VisitsFilters = ({ yearTo, yearFrom, onChangeYears }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), [setIsModalOpen]);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), [setIsModalOpen]);


  const {
    handleSubmit,
    yearFirst,
    yearSecond,
    handleChangeYearFirst,
    handleChangeYearSecond,
  } = useFilters({ yearFrom, yearTo, onChangeYears, handleCloseModal });

  let filters = '';
  if(yearFrom || yearTo) {
    if(yearFrom) {
      filters = `od ${yearFrom} `;
    }
    if(yearTo) {
      filters = `${filters} do ${yearTo}`;
    }
  } else {
    filters = 'brak filtrów';
  }


  return ( 
    <div className='m-top-l m-bottom-m'>
      <div className={styles.row}>
        <Button
          size="small"
          color="tertiary"
          onClick={handleOpenModal}
        >
          Filtruj
        </Button>
        <span className='m-left-s'>
          {filters}
        </span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <form 
          onSubmit={handleSubmit} 
          className={styles.form}
        >
          <div className={styles.yearsInputs}>
            <div>
              <InputField 
                type="number"
                placeholder="Od roku"
                label="Od roku"
                fullWidth
                value={yearFirst.value}
                error={yearFirst.error}
                onChange={handleChangeYearFirst}
                inputProps={{
                  step: 1,
                  min: '2000',
                }}
                message="Podaj rok (od 2000)"
              />
            </div>
            <div>
              <InputField 
                type="number"
                placeholder="Do roku"
                label="Do roku"
                fullWidth
                value={yearSecond.value}
                error={yearSecond.error}
                onChange={handleChangeYearSecond}
                inputProps={{
                  step: "1",
                  min: '2000',
                }}
              />
            </div>
          </div>
          <div className="m-top-l text-centered">
            <Button 
              type="submit"
              color="tertiary"
              disabled={yearFirst.error || yearSecond.error}
            >
                Filtruj
            </Button>     
          </div>
        </form>
      </Modal>
    </div>
  );
}

VisitsFilters.propTypes = {
  onChangeYears: PropTypes.func.isRequired,
  yearTo: PropTypes.string,
  yearFrom: PropTypes.string,
};
 
export default VisitsFilters;