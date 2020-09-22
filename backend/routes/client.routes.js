const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

router.get('/', clientController.getAll);

router.get('/:id', clientController.getOne);

router.post('/', clientController.createOne);

router.put('/:id', clientController.updateOne);

router.delete('/:id', clientController.deleteOne);

module.exports = router;