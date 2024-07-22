const express = require('express');
const router = express.Router();
const LoginController  = require('../../../src/controllers/auth/loginController');


router.post('/login', LoginController.login);
router.post('/check-admin', LoginController.checkAdmin);


module.exports = router;
