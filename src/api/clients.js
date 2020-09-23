import axios from 'axios';
import generateAuthConfig from '../utils/generateAuthConfig';
import api from '../settings/api.endpoints';



export const getAll = async (key, { token }) => {
  const url = `${api.baseUrl}/${api.endpoints.clients}`;

  const config = generateAuthConfig(token);

  const resp = await axios.get(url, config);

  return resp.data;
}