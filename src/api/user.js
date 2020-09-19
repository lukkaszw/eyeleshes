import axios from 'axios';
import api from '../settings/api.endpoints';

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