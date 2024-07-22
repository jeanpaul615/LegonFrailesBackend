const express = require('express');
const router = express.Router();
const { userCreate } = require('../../controllers/user/userController');

router.post('/userCreate', userCreate);

module.exports = router;
