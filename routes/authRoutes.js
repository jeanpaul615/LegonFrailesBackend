//Manejan las rutas y el tipo de http
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController')

router.post('/login', login);

module.exports = router;