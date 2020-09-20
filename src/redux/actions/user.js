const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOGIN = createActionName('LOGIN');
export const LOGOUT = createActionName('LOGOUT');
export const SET_USER_DATA = createActionName('SET_USER_DATA');
