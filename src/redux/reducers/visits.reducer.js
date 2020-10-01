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
          yaersFrom: action.payload.yaersFrom,
          yaersTo: action.payload.yaersTo,
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
    case ACTIONS.visits.SET_PAGES_AMOUNT: {
      return {
        ...statePart,
        queries: {
          ...statePart.queries,
          pagesAmount: action.payload,
        },
      };
    }

    default: 
      return statePart;
  }
}

export default visitsReducer;