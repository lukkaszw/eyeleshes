import ACTIONS from '../actions';

export const login = ({ token, user }) => ({ payload: { token, user}, type: ACTIONS.user.LOGIN });
export const logout = () => ({ type: ACTIONS.user.LOGOUT });
export const setUserData = ({ user }) => ({ payload: user, type: ACTIONS.user.SET_USER_DATA });
