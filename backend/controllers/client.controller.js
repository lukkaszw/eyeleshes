const Client = require('../models/client');
const ERRORS = require('../errors/errors');
const sendErrors = require('../errors/sendErrors');
const { getClientsWithLastVisits } = require('../utils/findLastVisit');

const createOne = async (req, res) => {
  const userId = req.user._id;

  const { name, surname } = req.body;

  try {
    const client = new Client({ userId, name, surname });

    await client.save();

    res.json(client);

  } catch (error) {
    sendErrors.sendPostErrors(error, res, ERRORS.FORMS.client.post);
  }
}

const getAll = async (req, res) => {
  const userId = req.user._id;

  try {
    const clients = await Client.find({ userId, })

    const clientsWithLastVisit = await getClientsWithLastVisits(clients);

    res.json(clientsWithLastVisit);
  } catch (error) {
    res.status(500).json({
      error: ERRORS.BAD_SERVER,
    });
  }
}

const getOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const client = await Client.findOne({ _id, userId });

    if(!client) {
      res.status(404).json({
        error: ERRORS.NOT_FOUND,
      });
      return;
    }

    res.json(client);

  } catch (error) {
    sendErrors.sendGetErrors(error, res);
  }
}

const updateOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  const allowedUpdates = ['name', 'surname'];
  const data = req.body;
  const updates = Object.keys(data);

  const isMatch = updates.every(update => allowedUpdates.includes(update));

  if(!isMatch) {
    res.status(400).json({
      error: ERRORS.FORMS.client.update,
    });
    return;
  }

  try {
    const client = await Client.findOne({ _id, userId });

    if(!client) {
      res.status(404).json({
        error: ERRORS.NOT_FOUND,
      }); 
      return;
    }

    updates.forEach(update => {
      client[update] = data[update];
    });

    await client.save();

    res.json(client);

  } catch (error) {
    sendErrors.sendPutErrors(error, res, ERRORS.FORMS.client.update);
  }
}

const deleteOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const client = await Client.findOne({ _id, userId });

    if(!client) {
      res.status(404).json({
        error: ERRORS.NOT_FOUND,
      }); 
      return;
    }

    await client.remove();

    res.json(client);

  } catch (error) {
    sendErrors.sendGetErrors(error, res);
  }
}

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};