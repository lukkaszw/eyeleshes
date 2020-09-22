const Client = require('../models/client');
const clientErrors = require('../middlewares/clientErrors');

const createOne = async (req, res) => {
  const userId = req.user._id;

  const { name, surname } = req.body;

  try {
    const client = new Client({ userId, name, surname });

    await client.save();

    res.json(client);

  } catch (error) {
    clientErrors.sendPostErrors(error, res);
  }
}

const getAll = async (req, res) => {
  const userId = req.user._id;

  try {
    const clients = await Client.find({ userId, })
      .select('-visits');

    res.json(clients);
  } catch (error) {
    res.status(500).json({
      error: 'Problemy z serwerem! Spróbuj ponownie później.',
    });
  }
}

const getOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const client = await Client.findOne({ _id, userId });
      // .populate('visits');

    if(!client) {
      res.status(404).json({
        error: 'Klient nie znaleziony! Błędny link do zasobu!',
      });
      return;
    }

    res.json(client);

  } catch (error) {
    clientErrors.sendGetErrors(error, res);
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
      error: 'Nieprawidłowa próba edycji. Można edytować tylko pola: name, surname',
    });
    return;
  }

  try {
    const client = await Client.findOne({ _id, userId });

    if(!client) {
      res.status(404).json({
        error: 'Klient nie odnaleziony! Sprawdź poprawność zapytania i spróbuj ponownie!',
      }); 
      return;
    }

    updates.forEach(update => {
      client[update] = data[update];
    });

    await client.save();

    res.json(client);

  } catch (error) {
    clientErrors.sendPutErrors(error, res);
  }
}

const deleteOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const client = await Client.findOne({ _id, userId });

    if(!client) {
      res.status(404).json({
        error: 'Klient nie odnaleziony! Sprawdź poprawność zapytania i spróbuj ponownie!',
      }); 
      return;
    }

    await client.remove();

    res.json(client);

  } catch (error) {
    clientErrors.sendGetErrors(error, res);
  }
}

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};