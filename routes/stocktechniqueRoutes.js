// routes/tecnicoRoutes.js
const express = require('express');
const router = express.Router();
const TechniqueController = require('../controllers/StocktechniqueController');
router.get('/get-stock', TechniqueController.getAllTechniques);
router.post('/add-stocktechnique', TechniqueController.addTechnique);
router.delete('/delete-stocktechnique', TechniqueController.deleteTechnique);
router.put('/update-stocktechnique', TechniqueController.updateTechnique);
router.post('/byname', TechniqueController.getCantidadStockTechnique);
router.put('/update-cantidad-stocktechnique', TechniqueController.updateCantidadStockTechnique);
router.post('/materials-by-tecnico', TechniqueController.getMaterialsByTecnico);
router.post('/cantidad-by-tecnico-material', TechniqueController.getCantidadByTecnicoAndMaterial);
router.get('/get-tecnicosstock',TechniqueController.getAllTecnicos);
module.exports = router;