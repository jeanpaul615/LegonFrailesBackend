const express = require('express');
const router = express.Router();
const TechniqueController = require('../../controllers/techniqueController');

// Obtener todos los técnicos
router.get('/get-technicians', (req, res) => {
  TechniqueController.getAllTechniques((err, data) => {
    if (err) {
      console.error('Error al obtener técnicos:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.status(200).json(data);
    }
  });
});

// Agregar un nuevo técnico
router.post('/add-technician', (req, res) => {
  const technicianData = req.body;

  TechniqueController.addTechnique(technicianData, (err, result) => {
    if (err) {
      console.error('Error al agregar técnico:', err);
      res.status(500).json({ error: 'Error interno al agregar técnico' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Eliminar un técnico por ID
router.delete('/delete-technician/:id', (req, res) => {
  const { id } = req.params;

  TechniqueController.deleteTechnique(id, (err) => {
    if (err) {
      console.error('Error al eliminar técnico:', err);
      res.status(500).json({ error: 'Error interno al eliminar técnico' });
    } else {
      res.status(200).json({ message: 'Técnico eliminado correctamente' });
    }
  });
});

// Actualizar los datos de un técnico
router.put('/update-technician/:id', (req, res) => {
  const technicianData = req.body;
  const { id } = req.params;

  TechniqueController.updateTechnique({ ...technicianData, id }, (err) => {
    if (err) {
      console.error('Error al actualizar técnico:', err);
      res.status(500).json({ error: 'Error interno al actualizar técnico' });
    } else {
      res.status(200).json({ message: 'Técnico actualizado correctamente' });
    }
  });
});

module.exports = router;
