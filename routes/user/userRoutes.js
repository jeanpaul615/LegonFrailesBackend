const express = require('express');
const router = express.Router();
const { userController } = require('../../controllers/user/userController');

router.post('/userCreate', userController);

module.exports = router;
