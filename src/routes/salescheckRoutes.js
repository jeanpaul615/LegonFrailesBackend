const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/salescheckController');

router.get('/get-factura', SalesController.getAllStocks);
router.post('/add-factura', SalesController.addStock);

module.exports = router;
