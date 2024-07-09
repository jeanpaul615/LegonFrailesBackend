const express = require('express');
const router = express.Router();
const devolucionesController = require('../controllers/devolucionController');

router.get('/get-devolucion', devolucionesController.getAllDevoluciones);
router.post('/add-devolucion', devolucionesController.createDevolucion);

module.exports = router;
