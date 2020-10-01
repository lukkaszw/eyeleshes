const reducerName = 'visits';
const createActionName = name => `app/${reducerName}/${name}`;

export const SET_PAGE = createActionName('SET_PAGE');
export const SET_YEARS = createActionName('SET_YEARS');
export const SET_SORT = createActionName('SET_SORT');
export const RESET_VISITS_QUERIES = createActionName('RESET_VISITS_QUERIES');