import axios from 'axios';
import api from '../settings/api.endpoints';
import generateAuthConfig from '../utils/generateAuthConfig';

export const addVisit = async ({ token, clientId, parameters, price, comment, date }) => {
  const url = `${api.baseUrl}/${api.endpoints.visits}`;

  const config = generateAuthConfig(token);

  const resp = await axios.post(url, { clientId, parameters, price, comment, date }, config);

  return resp.data;
}