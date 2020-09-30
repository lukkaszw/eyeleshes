import React from 'react';
import PropTypes from 'prop-types';

const VisitsFilters = ({ yearTo, yearFrom, onChangeYaers }) => {
  return ( 
    <div>
      Visit Filters
    </div>
  );
}

VisitsFilters.propTypes = {
  onChangeYaers: PropTypes.func.isRequired,
  yearTo: PropTypes.string.isRequired,
  yearFrom: PropTypes.string.isRequired,
};
 
export default VisitsFilters;