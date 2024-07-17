const express = require('express');
const router = express.Router();
const trasladoController = require('../controllers/trasladoController');

// Ruta para obtener todos los traslados
router.get('/get-all', trasladoController.getAllTraslado);

// Ruta para agregar un nuevo traslado
router.post('/add', trasladoController.addTraslado);

// Ruta para actualizar un traslado
router.put('/update', trasladoController.updateTraslado);

module.exports = router;
