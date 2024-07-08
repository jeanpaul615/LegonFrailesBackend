const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stockController');

router.post('/byname', StockController.getCantidadByNombreMaterial);
router.get('/get-stocksistema', StockController.getAllStocks);
router.post('/add-stocksistema', StockController.addStock);
router.post('/update-stockbytecnico',StockController.updateStockByTecnico);
router.post('/update-stockbydevolucion',StockController.updateStockByDevolucion);
router.put('/update-stocksistema/:Id_stocksistema', StockController.updateStock);

module.exports = router;
