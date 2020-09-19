import ACTIONS from '../actions';

export const login = ({ token, user }) => ({ payload: { token, user}, type: ACTIONS.user.LOGIN });