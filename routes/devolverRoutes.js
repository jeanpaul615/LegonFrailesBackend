const express = require('express');
const router = express.Router();
const devolverController = require('../controllers//devolverController');

router.get('/get-devolver', devolverController.getAllDevoluciones);
router.post('/add-devolver', devolverController.createDevolucion);
router.put('/update-devolver', devolverController.updateDevolucion);


module.exports = router;
