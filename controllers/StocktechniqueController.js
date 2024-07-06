const Stock = require('../crud/StockTechnique/Stocktechnique');

const TechniqueController = {
  getAllTechniques: (req, res) => {
    Stock.getAllTechniques((err, data) => {
      if (err) {
        console.error('Error al obtener técnicas:', err);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        res.status(200).json(data);
      }
    });
  },

  addTechnique: (req, res) => {
    const { cedula, nombreTecnico, nombreMaterial, cantidad, fechaModificacion } = req.body;

    if (!cedula || !nombreTecnico || !nombreMaterial || !cantidad || !fechaModificacion) {
      return res.status(400).json({ error: 'Los campos cedula, nombreTecnico, nombreMaterial, cantidad y fechaModificacion son requeridos.' });
    }

    Stock.addStock(cedula, nombreTecnico, nombreMaterial, cantidad, fechaModificacion, (err, result) => {
      if (err) {
        console.error('Error al agregar técnica:', err);
        return res.status(500).json({ error: 'Error interno al agregar técnica' });
      }
      res.status(200).json({ message: 'Técnica agregada correctamente', insertId: result.insertId });
    });
  },

  deleteTechnique: (req, res) => {
    const { id } = req.params;

    Stock.deleteStock(id, (err) => {
      if (err) {
        console.error('Error al eliminar técnica:', err);
        return res.status(500).json({ error: 'Error interno al eliminar técnica' });
      }
      res.status(200).json({ message: 'Técnica eliminada correctamente' });
    });
  },

  updateTechnique: (req, res) => {
    const { id } = req.params;
    const { nombreMaterial, cantidad, fechaModificacion } = req.body;

    if (!nombreMaterial || !cantidad || !fechaModificacion) {
      return res.status(400).json({ error: 'Los campos nombreMaterial, cantidad y fechaModificacion son requeridos.' });
    }

    Stock.updateStock(id, nombreMaterial, cantidad, fechaModificacion, (err) => {
      if (err) {
        console.error('Error al actualizar técnica:', err);
        return res.status(500).json({ error: 'Error interno al actualizar técnica' });
      }
      res.status(200).json({ message: 'Técnica actualizada correctamente' });
    });
  }
};

module.exports = TechniqueController;
