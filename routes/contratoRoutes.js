const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/contratoController');

router.get('/get-contratos', ContratoController.getAllContratos);

module.exports = router;
