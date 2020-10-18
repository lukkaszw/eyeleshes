export const checkAuth = ({ user }) => !!user.token;
export const getLogin = ({ user }) => user.data.login;
export const getToken = ({ user }) => user.token;