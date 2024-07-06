const express = require('express');
const router = express.Router();
const { login, checkAdmin } = require('../controllers/loginController');
const StockController = require('../controllers/stockController');
const TechniqueController = require('../controllers/StocktechniqueController')

router.get('/get-stocksistema', StockController.getAllStocks);
router.post('/add-stocksistema', StockController.addStock);
router.delete('/delete-stocksistema/:id', StockController.deleteStock);
router.put('/update-stocksistema/:Id_stocksistema/:Nombre_material/:Cantidad/:Estado', StockController.updateStock);
router.post('/login', login);
router.get('/check-admin', checkAdmin); // Nueva ruta para verificar si es administrador
router.get('/get-stocktechnique',TechniqueController.getAllTechniques);
router.post('/add-stocktechnique',TechniqueController.addTechnique);
router.delete('/delete-stocktechnique',TechniqueController.deleteTechnique);
router.put('/update-stocktechnique',TechniqueController.updateTechnique);
module.exports = router;
