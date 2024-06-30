const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const StockController = require('../controllers/stockController')


router.get('/get-stocksistema', StockController.getAllStocks);
router.post('/add-stocksistema', StockController.addStock);
router.post('/login', login);

module.exports = router;
