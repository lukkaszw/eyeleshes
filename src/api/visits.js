import axios from 'axios';
import api from '../settings/api.endpoints';
import generateAuthConfig from '../utils/generateAuthConfig';
import PAGES from '../settings/pages';

export const addVisit = async ({ token, clientId, parameters, price, comment, date }) => {
  const url = `${api.baseUrl}/${api.endpoints.visits}`;

  const config = generateAuthConfig(token);

  const resp = await axios.post(url, { clientId, parameters, price, comment, date }, config);

  return resp.data;
}

export const getAll = async (key, { 
  token, clientId,
  page, sortCat, sortBy,
  yearFrom, yearTo,
}) => {
  const url = `${api.baseUrl}/${api.endpoints.visits}`;

  const config = generateAuthConfig(token);

  const maxOnPages = PAGES.VISITS.MAX_ON_PAGE;

  //pagination
  config.params = {
    limit: maxOnPages,
    skip: (page - 1) * maxOnPages,
  };

  //clientId
  if(clientId) {
    config.params.clientId = clientId;
  }

  //sort
  config.params.sortBy = `${sortCat}_${sortBy}`;

  //years
  if (!!yearFrom || !!yearTo) {
    config.params.years = `${yearFrom}_${yearTo}`;
  }

  const resp = await axios.get(url, config);

  return resp.data;
}

export const getStats = async (key, { token, clientId }) => {
  const url = `${api.baseUrl}/${api.endpoints.visitsStats}`;

  const config = generateAuthConfig(token);

  if(clientId) {
    config.params = { clientId };
  }

  const resp = await axios.get(url, config);

  return resp.data;
}