import { useMemo } from 'react';
import PAGES from '../../../settings/pages';


const useClientsFilters = ({ data, page, sortBy, searchBy }) => {

  const { clientsOnPage, pagesAmount } = useMemo(() => {
    
    //search
    let searchedClients = [...data];
    if(searchBy) {
      const regexp = new RegExp(`^${searchBy}`, 'i');
      searchedClients = searchedClients.filter(client => (regexp.test(client.surname) || regexp.test(client.name)));
    }
    
    //sort
    const sortKey = sortBy === 'asc' ? 1 : -1;
  
    searchedClients.sort((a, b) =>  {
      const aFullName = `${a.surname} ${a.name}`;
      const bFullName = `${b.surname} ${b.name}`;
  
      if (aFullName > bFullName) {
        return sortKey;
      }
      if (bFullName > aFullName) {
          return -1 * sortKey;
      }
      return 0;
    });
  
    //paginate
    const clientsLimitOnPage = PAGES.CLIENTS.MAX_ON_PAGE;
    const pagesAmount = Math.ceil(searchedClients.length/clientsLimitOnPage); 
  
    const startIndex = (page - 1) * clientsLimitOnPage;
    const endIndex = startIndex + clientsLimitOnPage;
    const clientsOnPage = searchedClients.slice(startIndex, endIndex);
    
  
    return {
      clientsOnPage,
      pagesAmount,
    }
  
  }, [data, page, sortBy, searchBy]);

  return {
    clientsOnPage,
    pagesAmount,
  }
}

export default useClientsFilters;
