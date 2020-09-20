export const checkAuth = ({ user }) => !!user.token;
export const getToken = ({ user }) => user.token;