import React from 'react';
import PropTypes from 'prop-types';

import InlineLink from '../../../common/InlineLink';

const AcceptRegulations = ({ inheritColor }) => {
  return ( 
    <span>
      akceptuję <InlineLink inheritColor={inheritColor} to="/regulations">regulamin</InlineLink> serwisu
    </span>
  );
}

AcceptRegulations.propTypes = {
  inheritColor: PropTypes.bool,
};
 
export default AcceptRegulations;