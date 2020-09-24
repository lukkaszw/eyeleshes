import ACTIONS from '../actions';

export const setPage = (page) => ({ payload: page, type: ACTIONS.clients.SET_PAGE });
export const setSearchBy = (searchBy) => ({ payload: searchBy, type: ACTIONS.clients.SET_SEARCH_BY });
export const setSortBy = (sortBy) => ({ payload: sortBy, type: ACTIONS.clients.SET_SORT_BY });