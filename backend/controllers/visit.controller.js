const Visit = require('../models/visit');
const mongoose = require('mongoose');
const ERRORS = require('../errors/errors');
const sendErrors = require('../errors/sendErrors');


const createOne = async (req, res) => {
  const userId = req.user._id;

  const { clientId, parameters, method, thickness, date, comment, price } = req.body;

  try {
    const visit = new Visit({ userId, clientId, parameters, method, thickness, date, comment, price });

    await visit.save();

    res.json(visit); 

  } catch (error) {
    sendErrors.sendPostErrors(error, res, ERRORS.FORMS.visit.post);
  }
};

const getAll = async (req, res) => {
  const userId = req.user._id;
  const { 
    clientId, 
    skip,
    limit,
    sortBy,
    years,
  } = req.query;

  // search options
  const search = {
    userId,
  };

 
  if(clientId) {
    search.clientId = clientId;
  }

  if(years) {
    if(years.includes('_')) {
      const parts = years.split('_');
      const yearFrom = parts[0] || 'not a year';
      const yearTo = parts[1] || 'not a yaer';
      if(!isNaN(yearFrom) || !isNaN(yearTo)) {
        search.date = {};
  
        if(!isNaN(yearFrom)) {
          search.date.$gte = `${yearFrom}-01-01T00:00:00.001Z`;
        }
        if(!isNaN(yearTo)) {
          search.date.$lte = `${yearTo}-12-31T23:59:59.999Z`;
        }
      }
    } else {
      if(!isNaN(years)) {
        search.date = {
          $gte: `${years}-01-01T00:00:00.001Z`,
          $lte: `${years}-12-31T23:59:59.999Z`,
        }
      }
    }
  }

  // sort options
  const sort = {
    date: -1,
  };

  if(sortBy) {
    const parts = sortBy.split('_');
    const allowed = ['date', 'price'];

    if(allowed.includes(parts[0])) {
      delete sort.date;
      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    } 
  }

  try {
    const amount = await Visit.countDocuments(search);

    const visits = await Visit
      .find(search)
      .sort(sort)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const pages = Math.ceil(amount / parseInt(limit));

    res.json({ visits, pages });

  } catch (error) {
    sendErrors.sendGetErrors(error, res);
  }
}

const getOne = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  try {
    const visit = await Visit.findOne({ _id, userId })
      .populate('clientId');

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

  const data = req.body;

  const allowedUpdates = ['parameters', 'method', 'thickness', 'date', 'comment', 'price'];
  const updates = Object.keys(data);
  const match = updates.every(update => allowedUpdates.includes(update));

  if(!match) {
    res.status(400).json({
      error: ERRORS.FORMS.visit.update,
    });
    return;
  }

  try {
    const visit = await Visit.findOne({ _id, userId });

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
    const lastVisit = await Visit.findOne({ userId, clientId }).sort({ date: -1 });

    const aggregateVisits = await Visit.aggregate([
      { "$match": { 
        "clientId": mongoose.Types.ObjectId(clientId), 
        "userId": mongoose.Types.ObjectId(userId),
        } 
      },
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
      lastVisit: lastVisit || null,
      totalAmount,
      totalCost,
      averageCost,
      thisYearAmount,
      mostCommonVisit: aggregateVisits.length > 0 ? ({
        parameters: aggregateVisits[0]._id,
        count: aggregateVisits[0].count,
      }) : null,
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