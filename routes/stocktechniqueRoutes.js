// routes/tecnicoRoutes.js
const express = require('express');
const router = express.Router();
const TechniqueController = require('../controllers/StocktechniqueController');
router.get('/get-stocktechnique', TechniqueController.getAllTechniques);
router.post('/add-stocktechnique', TechniqueController.addTechnique);
router.delete('/delete-stocktechnique', TechniqueController.deleteTechnique);
router.put('/update-stocktechnique', TechniqueController.updateTechnique);
router.post('/byname', TechniqueController.getCantidadStockTechnique);

module.exports = router;