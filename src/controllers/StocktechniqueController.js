const Stock = require('../crud/stockTechnique/stocktechnique');

const TechniqueController = {
  getAllTechniques: (req, res) => {
    Stock.getAll((err, data) => {
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

    if (!Nombre_tecnico || !Nombre_material || !Cantidad) {
      return res.status(400).json({ error: 'Los campos Nombre_tecnico, Nombre_material, Cantidad son requeridos.' });
    }

    const Fecha_modificacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

    Stock.getByNombreMaterialAndTecnico(Nombre_material, Nombre_tecnico, (err, existingTechnique) => {
      if (err) {
        console.error('Error al verificar existencia de la técnica:', err);
        return res.status(500).json({ error: 'Error interno al verificar existencia de la técnica' });
      }

      if (existingTechnique) {
        const nuevaCantidad = existingTechnique.Cantidad + parseInt(Cantidad);
        Stock.updateTechnique(existingTechnique.Id_stocktecnico, Nombre_material, Nombre_tecnico, nuevaCantidad, Fecha_modificacion, (err) => {
          if (err) {
            console.error('Error al actualizar técnica existente:', err);
            return res.status(500).json({ error: 'Error interno al actualizar técnica existente' });
          }
          res.status(200).json({ message: 'Técnica actualizada correctamente', existingId: existingTechnique.Id_stocktecnico });
        });
      } else {
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
    const { Id_stocktecnico, Nombre_material, Nombre_tecnico, Cantidad, Fecha_modificacion } = req.body;

    if (!Id_stocktecnico || !Nombre_material || !Nombre_tecnico || !Cantidad || !Fecha_modificacion) {
      return res.status(400).json({ error: 'Los campos Id_stocktecnico, Nombre_material, Nombre_tecnico, Cantidad y Fecha_modificacion son requeridos.' });
    }

    Stock.updateTechnique(Id_stocktecnico, Nombre_material, Nombre_tecnico, Cantidad, Fecha_modificacion, (err) => {
      if (err) {
        console.error('Error al actualizar técnica:', err);
        return res.status(500).json({ error: 'Error interno al actualizar técnica' });
      }
      res.status(200).json({ message: 'Técnica actualizada correctamente' });
    });
  },

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

  updateCantidadStockTechnique: (req, res) => {
    const { Nombre_tecnico, Nombre_material, Cantidad } = req.body;

    if (!Nombre_tecnico || !Nombre_material || !Cantidad) {
      return res.status(400).json({ error: 'Los campos Nombre_tecnico, Nombre_material y Cantidad son requeridos.' });
    }

    Stock.getByNombreMaterialAndTecnico(Nombre_material, Nombre_tecnico, (err, existingTechnique) => {
      if (err) {
        console.error('Error al verificar existencia de la técnica:', err);
        return res.status(500).json({ error: 'Error interno al verificar existencia de la técnica' });
      }

      if (existingTechnique) {
        const nuevaCantidad = existingTechnique.Cantidad - parseInt(Cantidad);


        Stock.updateCantidadStockTechnique(Nombre_material, Nombre_tecnico, Cantidad, (err) => {
          if (err) {
            console.error('Error al actualizar la cantidad del stock:', err);
            return res.status(500).json({ error: 'Error interno al actualizar la cantidad del stock' });
          }
          res.status(200).json({ message: 'Cantidad del stock actualizada correctamente' });
        });
      } else {
        res.status(404).json({ error: 'No se encontró ningún stock con el Nombre_material y Nombre_tecnico proporcionados.' });
      }
    });
  },

  getMaterialsByTecnico: (req, res) => {
    const { Nombre_tecnico } = req.body;
    Stock.getMaterialsByTecnico(Nombre_tecnico, (err, results) => {
      if (err) {
        console.error('Error al obtener los materiales:', err);
        return res.status(500).json({ error: 'Error interno al obtener los materiales' });
      }
      res.status(200).json(results);
    });
  },

  getAllTecnicos: (req, res) => {
    Stock.getAllTecnicos((err, results) => {
      if (err) {
        console.error('Error al obtener técnicos:', err);
        return res.status(500).json({ error: 'Error interno al obtener técnicos' });
      }
      res.status(200).json(results);
    });
  },

  getCantidadByTecnicoAndMaterial: (req, res) => {
    const { Nombre_tecnico, Nombre_material } = req.body;
    Stock.getCantidadByTecnicoAndMaterial(Nombre_tecnico, Nombre_material, (err, cantidad) => {
      if (err) {
        console.error('Error al obtener cantidad por técnico y material:', err);
        return res.status(500).json({ error: 'Error interno al obtener cantidad por técnico y material' });
      }
      if (cantidad === null) {
        return res.status(404).json({ error: 'No se encontró cantidad para el técnico y material proporcionados.' });
      }
      res.status(200).json({ cantidad });
    });
  },

  saveStockTecnico: (req, res) => {
    const { Nombre_material, Cantidad, Nombre_tecnico } = req.body;
    const Fecha_modificacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

    Stock.addTechnique(Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion, (err, result) => {
      if (err) {
        console.error('Error al guardar el stock técnico:', err);
        return res.status(500).json({ error: 'Error interno al guardar el stock técnico' });
      }
      res.status(200).json({ message: 'Stock técnico guardado correctamente', insertId: result.insertId });
    });
  },
};

module.exports = TechniqueController;
