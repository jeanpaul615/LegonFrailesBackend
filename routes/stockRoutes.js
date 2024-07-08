const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stockController');

router.post('/byname', StockController.getCantidadByNombreMaterial);
router.get('/get-stocksistema', StockController.getAllStocks);
router.post('/add-stocksistema', StockController.addStock);
router.post('/delete-stocksistema/:id', StockController.deleteStock);
router.put('/update-stocksistema/:Id_stocksistema/:Nombre_material/:Cantidad/:Estado', StockController.updateStock);
module.exports = router;