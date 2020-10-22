const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller');


router.post('/login', userController.signIn);

router.post('', userController.signUp);

router.get('/data', auth, userController.getUserData);

router.put('/logout', auth, userController.logout);

router.put('/me', auth, userController.updateLogin);

router.put('/pswd', auth, userController.updatePassword);

router.delete('/me', auth, userController.deleteUser);


module.exports = router;