// routes/tecnicoRoutes.js
const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/techniqueController');

router.get('/tecnicos', tecnicoController.getAllTecnicos);
router.get('/tecnicos/:id', tecnicoController.getTecnicoById);
router.post('/add-tecnico', tecnicoController.addTechnician);
router.put('/tecnicos/:id', tecnicoController.updateTecnico);
router.delete('/tecnicos/:id', tecnicoController.deleteTecnico);

module.exports = router;
