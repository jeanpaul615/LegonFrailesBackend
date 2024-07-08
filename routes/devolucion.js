// routes/devoluciones.js
const express = require('express');
const router = express.Router();
const devolucionController = require('../controllers/devolucionController');

// Ruta para obtener todos los datos de devoluciones
router.get('/get-devolucion', devolucionController.getAllDevolucion);

module.exports = router;
