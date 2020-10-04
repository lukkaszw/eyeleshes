import axios from 'axios';
import generateAuthConfig from '../utils/generateAuthConfig';
import api from '../settings/api.endpoints';



export const getAll = async (key, { token }) => {
  const url = `${api.baseUrl}/${api.endpoints.clients}`;

  const config = generateAuthConfig(token);

  const resp = await axios.get(url, config);

  return resp.data;
}

export const addClient = async ({ token, name, surname }) => {
  const url = `${api.baseUrl}/${api.endpoints.clients}`;

  const config = generateAuthConfig(token);

  const resp = await axios.post(url, { name, surname }, config);

  return resp.data;
}

export const getOne = async (key, { token, clientId }) => {
  const url = `${api.baseUrl}/${api.endpoints.clients}/${clientId}`;

  const config = generateAuthConfig(token);

  const resp = await axios.get(url, config);
  
  return resp.data;
}

export const deleteClient = async ({ token, clientId }) => {
  const url = `${api.baseUrl}/${api.endpoints.clients}/${clientId}`;

  const config = generateAuthConfig(token);

  const resp = await axios.delete(url, config);

  return resp.data;
}