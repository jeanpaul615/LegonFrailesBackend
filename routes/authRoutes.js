//Manejan las rutas y el tipo de http
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController')
const StockController = require('../controllers/stockController');
router.get('/get-stocksistema', StockController.getAllStocks); 
router.post('/login', login);

module.exports = router;