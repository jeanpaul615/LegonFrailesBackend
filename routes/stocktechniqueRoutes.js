const express = require('express');
const router = express.Router();
const TechniqueController = require('../controllers/StocktechniqueController');

router.get('/get-stock', TechniqueController.getAllTechniques);
router.post('/add-stocktechnique', TechniqueController.addTechnique);
router.delete('/delete-stocktechnique/:id', TechniqueController.deleteTechnique);
router.put('/update-stocktechnique/:id', TechniqueController.updateTechnique);
router.post('/stock-by-name', TechniqueController.getCantidadStockTechnique);
router.put('/update-cantidad-stocktechnique', TechniqueController.updateCantidadStockTechnique);
router.post('/materials-by-tecnico', TechniqueController.getMaterialsByTecnico);
router.get('/all-tecnicos', TechniqueController.getAllTecnicos);

module.exports = router;
