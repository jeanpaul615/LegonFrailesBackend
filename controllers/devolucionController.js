// controllers/devolucionesController.js
const Devolucion = require('../Models/Devolucion/Devolucion');

exports.getAllDevolucion = (req, res) => {
  Devolucion.getAll((err, devolucion) => {
    if (err) {
      console.error('Error getting devoluciones:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(devolucion);
  });
};
