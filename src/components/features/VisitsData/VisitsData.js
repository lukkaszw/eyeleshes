import React from 'react';
import PropTypes from 'prop-types';
import styles from './VisitData.module.scss';

import SmallPagination from '../../common/SmallPagination';
import VisitsList from '../VisitsList';

import { useQuery } from 'react-query';
import API from '../../../api';

const VisitsData = ({ token, clientId }) => {

  const { data } = useQuery(['visits', { token, clientId } ], 
    API.visits.getAll,  
    { suspense: true, cacheTime: 0 }
  );

  return ( 
    <>
      <div className={styles.pagination}>
        <SmallPagination 
          page={1}
          pagesAmount={10}
        />
      </div>

      <VisitsList 
        visits={data}
      />
    </>
  );
}

VisitsData.propTypes = {
  token: PropTypes.string.isRequired,
  clientId: PropTypes.string,
};
 
export default VisitsData;