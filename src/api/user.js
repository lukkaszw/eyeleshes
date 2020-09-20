import axios from 'axios';
import api from '../settings/api.endpoints';
import ACTION_CREATORS from '../redux/actionCreators';
import generateAuthConfig from '../utils/generateAuthConfig';
import { toast } from 'react-toastify';

export const signUp = async ({ login, password, confirmPassword }) => {
  const url = `${api.baseUrl}/${api.endpoints.user.register}`;

  const resp = await axios.post(url, { login, password, confirmPassword });

  return resp.data;
} 

export const signIn = async ({ login, password }) => {
  const url = `${api.baseUrl}/${api.endpoints.user.login}`;

  const resp = await axios.post(url, { login, password });

  return resp.data;
}

export const tryLoginOnStart = () => {
  const token = localStorage.getItem('tkn');
  return dispatch => {
    if(token) {
      dispatch(ACTION_CREATORS.user.login({ token }));

      const url = `${api.baseUrl}/${api.endpoints.user.getData}`;

      const config = generateAuthConfig(token);

      return axios.get(url, config)
        .then(res => {
          dispatch(ACTION_CREATORS.user.setUserData({ user: res.data }));
          toast.success('Zostałeś pomyślnie zalogowany!', {
              className: 'toast-success-custom toast-background',
              bodyClassName: 'toast-custom-body',
          });
        })
        .catch(() => {
          localStorage.removeItem('tkn');
          dispatch(ACTION_CREATORS.user.logout());
          toast.error('Automatyczne logowanie nie powiodło się! Zaloguj się manualnie!', {
            className: 'toast-error-custom toast-background',
            bodyClassName: 'toast-custom-body',
          });
        });
    }

    return null;
  }
};

export const logout = (token) => {
  localStorage.removeItem('tkn');

return dispatch => {
    dispatch(ACTION_CREATORS.user.logout());

    const url = `${api.baseUrl}/${api.endpoints.user.logout}`;

    const config = generateAuthConfig(token);

    axios.put(url, {}, config)
      .then(res => {
        console.log('Pomyślne wylogowanie również na serwerze!');
      })
      .catch(() => {
        console.warn('Error - logowanie nie powiodło się na serwerze. Logowanie lokalne zakończone sukcesem!');
      });
  }
}