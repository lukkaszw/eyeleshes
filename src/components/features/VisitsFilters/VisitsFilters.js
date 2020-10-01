import React from 'react';
import PropTypes from 'prop-types';

const VisitsFilters = ({ yearTo, yearFrom, onChangeYears }) => {
  return ( 
    <div>
      Visit Filters
    </div>
  );
}

VisitsFilters.propTypes = {
  onChangeYears: PropTypes.func.isRequired,
  yearTo: PropTypes.string,
  yearFrom: PropTypes.string,
};
 
export default VisitsFilters;