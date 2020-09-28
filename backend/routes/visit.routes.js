const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visit.controller');

router.get('/', visitController.getAll);

router.get('/stats', visitController.getStats);

router.get('/:id', visitController.getOne);

router.post('/', visitController.createOne);

router.put('/:id', visitController.updateOne);

router.delete('/:id', visitController.deleteOne);

module.exports = router;