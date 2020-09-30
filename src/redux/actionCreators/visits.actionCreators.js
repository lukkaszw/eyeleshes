import ACTIONS from '../actions';

export const setPage = (page) => ({ payload: page, type: ACTIONS.visits.SET_PAGE });
export const setSort = ({ sortCat, sortBy }) => ({ payload: {sortCat, sortBy }, type: ACTIONS.visits.SET_SORT });
export const setYears = ({ yearFrom, yearTo }) => ({ payload: { yearFrom, yearTo}, type: ACTIONS.visits.SET_YEARS });