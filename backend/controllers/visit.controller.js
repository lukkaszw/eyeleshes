const Visit = require('../models/visit');
const mongoose = require('mongoose');
const ERRORS = require('../errors/errors');
const sendErrors = require('../errors/sendErrors');


const createOne = async (req, res) => {
  const userId = req.user._id;

  const { clientId, parameters, date, comment, price } = req.body;

  try {
    const visit = new Visit({ userId, clientId, parameters, date, comment, price });

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

  const allowedUpdates = ['parameters', 'date', 'comment', 'price'];
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

const getStats = async (req, res) => {
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
    const lastVisit = await Visit.findOne({ clientId }).sort({ date: -1 });

    const aggregateVisits = await Visit.aggregate([
      { "$match": { "clientId": mongoose.Types.ObjectId(clientId) } },
      {
      "$sortByCount": "$parameters",
    }]);

    //count stats
    const totalAmount = visits.length;
    const totalCost = visits.reduce((prevCost, nextVisit) => {
      return prevCost + nextVisit.price;
    }, 0);
    const averageCost = totalCost > 0 ? (totalCost / visits.length) : 0;

    const thisYear = new Date().getFullYear();

    const thisYearAmount = visits.filter(visit => (new Date(visit.date).getFullYear() === thisYear)).length;

    res.json({
      lastVisit: lastVisit ? lastVisit.parameters : null,
      totalAmount,
      totalCost,
      averageCost,
      thisYearAmount,
      mostCommonVisit: aggregateVisits.length > 0 ? aggregateVisits[0]._id : null,
    });

  } catch (error) {
    console.log(error);
    sendErrors.sendGetErrors(error, res);
  }
}

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  getStats,
};