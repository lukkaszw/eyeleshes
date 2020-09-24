import ACTIONS from '../actions';

const clientsReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case ACTIONS.clients.SET_PAGE: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          page: action.payload,
        },
      };
    }
    case ACTIONS.clients.SET_SEARCH_BY: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          page: 1,
          searchBy: action.payload,
        },
      };
    }
    case ACTIONS.clients.SET_SORT_BY: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          sortBy: action.payload,
        },
      };
    }
   
    default: 
      return statePart;
  }
}

export default clientsReducer;