const Visit = require('../models/visit');
const ERRORS = require('../errors/errors');
const sendErrors = require('../errors/sendErrors');


const createOne = async (req, res) => {
  const userId = req.user._id;

  const { clientId, parameters, date, comment } = req.body;

  try {
    const visit = new Visit({ userId, clientId, parameters, date, comment });

    await visit.save();

    res.json(visit); 

  } catch (error) {
    sendErrors.sendPostErrors(error, res, ERRORS.FORMS.visit.post);
  }
};

const getAll = async (req, res) => {
  const userId = req.user._id;
  const clientId = req.query.clientId;

  const search = {
    userId,
  };

  if(clientId) {
    search.clientId = clientId;
  }

  try {
    const visits = await Visit.find(search);

    res.json(visits);

  } catch (error) {
    sendErrors.sendGetErrors(error, res);
  }
}

const getOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const visit = await Visit.findOne({ _id, userId })

    if(!visit) {
      res.status(404).json({
        error: ERRORS.NOT_FOUND,
      });
      return;
    }

    res.json(visit);

  } catch (error) {
    sendErrors.sendGetErrors(error, res);
  }
}

const updateOne = async (req, res) => {
  const userId = req.user.id;
  const _id = req.params.id;
  const clientId = req.body.clientId;

  const data = req.body;
  delete data.clientId;

  const allowedUpdates = ['parameters', 'date', 'comment'];
  const updates = Object.keys(data);
  const match = updates.every(update => allowedUpdates.includes(update));

  if(!match) {
    res.status(400).json({
      error: ERRORS.FORMS.visit.update,
    });
    return;
  }

  try {
    const visit = await Visit.findOne({ _id, clientId, userId });

    if(!visit) {
      res.status(404).json({
        error: ERRORS.NOT_FOUND,
      });
      return;
    }

    updates.forEach(update => {
      visit[update] = data[update];
    });

    await visit.save();

    res.json(visit);
  } catch (error) {
    sendErrors.sendPutErrors(error, res, ERRORS.FORMS.visit.update);
  }

}

const deleteOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const visit = await Visit.findOne({ _id, userId });

    if(!visit) {
      res.status(404).json({
        error: ERRORS.NOT_FOUND,
      });
      return;
    }

    await visit.remove();

    res.json(visit);
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