const Stock = require('../Models/StockTechnique/Stocktechnique');

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
    const { Nombre_tecnico, Nombre_material, Cantidad } = req.body;

    // Verificar los campos requeridos
    if (!Nombre_tecnico || !Nombre_material || !Cantidad) {
      return res.status(400).json({ error: 'Los campos Nombre_tecnico, Nombre_material, Cantidad son requeridos.' });
    }

    // Obtener la fecha actual
    const Fecha_modificacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Verificar si ya existe un registro con el mismo nombre_material y nombre_tecnico
    Stock.getByNombreMaterialAndTecnico(Nombre_material, Nombre_tecnico, (err, existingTechnique) => {
      if (err) {
        console.error('Error al verificar existencia de la técnica:', err);
        return res.status(500).json({ error: 'Error interno al verificar existencia de la técnica' });
      }

      if (existingTechnique) {
        // Si existe, sumar la cantidad
        const nuevaCantidad = existingTechnique.Cantidad + parseInt(Cantidad);
        Stock.updateTechnique(existingTechnique.Id_stocktecnico, Nombre_material, nuevaCantidad, Fecha_modificacion, (err) => {
          if (err) {
            console.error('Error al actualizar técnica existente:', err);
            return res.status(500).json({ error: 'Error interno al actualizar técnica existente' });
          }
          res.status(200).json({ message: 'Técnica actualizada correctamente', existingId: existingTechnique.Id_stocktecnico });
        });
      } else {
        // Si no existe, agregar como nuevo
        Stock.addTechnique(Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion, (err, result) => {
          if (err) {
            console.error('Error al agregar técnica nueva:', err);
            return res.status(500).json({ error: 'Error interno al agregar técnica nueva' });
          }
          res.status(200).json({ message: 'Técnica agregada correctamente', insertId: result.insertId });
        });
      }
    });
  },

  deleteTechnique: (req, res) => {
    const { id } = req.params;

    Stock.deleteTechnique(id, (err) => {
      if (err) {
        console.error('Error al eliminar técnica:', err);
        return res.status(500).json({ error: 'Error interno al eliminar técnica' });
      }
      res.status(200).json({ message: 'Técnica eliminada correctamente' });
    });
  },
  

  updateTechnique: (req, res) => {
    const { id } = req.params;
    const { Nombre_material, Cantidad, Fecha_modificacion } = req.body;
  
    if (!Nombre_material || !Cantidad || !Fecha_modificacion) {
      return res.status(400).json({ error: 'Los campos Nombre_material, Cantidad y Fecha_modificacion son requeridos.' });
    }
  
    Stock.updateTechnique(id, Nombre_material, Cantidad, Fecha_modificacion, (err) => {
      if (err) {
        console.error('Error al actualizar técnica:', err);
        return res.status(500).json({ error: 'Error interno al actualizar técnica' });
      }
      res.status(200).json({ message: 'Técnica actualizada correctamente' });
    });
  },
// Modifica la función getCantidadStockTechnique en TechniqueController.js

getCantidadStockTechnique: (req, res) => {
  const { Nombre_material, Nombre_tecnico } = req.body;

  if (!Nombre_material || !Nombre_tecnico) {
    return res.status(400).json({ error: 'Nombre_material y Nombre_tecnico son requeridos en el cuerpo de la solicitud' });
  }

  Stock.getCantidadStockTechnique(Nombre_material, Nombre_tecnico, (err, cantidad) => {
    if (err) {
      console.error('Error al obtener cantidad:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else if (cantidad === null) {
      res.status(404).json({ error: 'Stock no encontrado' });
    } else {
      res.status(200).json({ cantidad });
    }
  });
},

  
};

module.exports = TechniqueController;
