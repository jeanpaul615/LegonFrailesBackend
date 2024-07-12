const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/ContratoController');

router.get('/get-contratos', ContratoController.getAllContratos);
router.post('/add-contratos', ContratoController.addContrato);

module.exports = router;