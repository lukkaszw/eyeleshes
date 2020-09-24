const reducerName = 'clients';
const createActionName = name => `app/${reducerName}/${name}`;

export const SET_PAGE = createActionName('SET_PAGE');
export const SET_SEARCH_BY = createActionName('SET_SEARCH_BY');
export const SET_SORT_BY = createActionName('SET_SORT_BY');