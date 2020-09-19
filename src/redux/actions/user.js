const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOGIN = createActionName('LOGIN');
