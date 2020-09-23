const Visit = require('../models/visit');

const findLastVisit = async (client) => {
  const lastVisit = await Visit.findOne({ clientId: client._id }).sort({ date: -1 });
  return {
    ...client.toObject(),
    lastVisit,
  }
}

const getClientsWithLastVisits = async (clients) => {
  return Promise.all(clients.map(client => findLastVisit(client)));
}

module.exports = {
  findLastVisit,
  getClientsWithLastVisits,
}