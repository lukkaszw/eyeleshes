import ACTIONS from '../actions';

const visitsReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case ACTIONS.visits.SET_PAGE: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          page: action.payload,
        },
      };
    }
    case ACTIONS.visits.SET_YEARS: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          page: 1,
          yearFrom: action.payload.yearFrom,
          yearTo: action.payload.yearTo,
        },
      };
    }
    case ACTIONS.visits.SET_SORT: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          sortCat: action.payload.sortCat,
          sortBy: action.payload.sortBy,
        },
      };
    }
    default: 
      return statePart;
  }
}

export default visitsReducer;