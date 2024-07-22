const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/agreementController');

router.get('/get-contratos', ContratoController.getAllContratos);
router.post('/add-contratos', ContratoController.addContrato);
router.put('/update-contratos',ContratoController.updateContrato);

module.exports = router;