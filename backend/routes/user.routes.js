const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');


router.post('/login', userController.signIn);

router.post('', userController.signUp);

router.get('/data', auth, userController.getUserData);



module.exports = router;