const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const StockController = require('../controllers/stockController')
router.get('/get-stocksistema', StockController.getAllStocks);
router.post('/add-stocksistema', StockController.addStock);
router.delete('/delete-stocksistema/:id',StockController.deleteStock);
router.put('/update-stocksistema/:Id_stocksistema/:Nombre_material/:Cantidad/:Estado', StockController.updateStock);
router.post('/login', login);

module.exports = router;
