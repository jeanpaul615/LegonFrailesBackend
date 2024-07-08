const Stock = require('../Models/Stock/Stock');

const StockController = {
  getAllStocks: (req, res) => {
    Stock.getAllStocks((err, data) => {
      if (err) {
        console.error('Error al obtener stocks:', err);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        res.status(200).json(data);
      }
    });
  },

  addStock: (req, res) => {
    const { Nombre_material, Cantidad, Estado } = req.body;

    if (!Nombre_material || !Cantidad || !Estado) {
      return res.status(400).json({ error: 'Los campos Nombre_material, Cantidad y Estado son requeridos.' });
    }

    Stock.addStocks(Nombre_material, Cantidad, Estado, (err, result) => {
      if (err) {
        console.error('Error al insertar stock:', err);
        return res.status(500).json({ error: 'Error interno al agregar stock' });
      }
      res.status(200).json({ message: 'Stock agregado correctamente', insertId: result.insertId });
    });
  },

  updateStock: (req, res) => {
    const { Id_stocksistema, Nombre_material } = req.params;
    const { Cantidad, Estado } = req.body;
  
    try {
      // Obtener el stock actual del material
      const currentStock = db.query('SELECT Cantidad FROM stocksistema WHERE Id_stocksistema = ? AND Nombre_material = ?', [Id_stocksistema, Nombre_material]);
  
      if (currentStock.length === 0) {
        return res.status(404).json({ error: 'Stock not found' });
      }
  
      const updatedStock = currentStock[0].Cantidad - Cantidad;
  
      // Actualizar el stock en la base de datos
      db.query('UPDATE stocksistema SET Cantidad = ?, Estado = ? WHERE Id_stocksistema = ? AND Nombre_material = ?', [updatedStock, Estado, Id_stocksistema, Nombre_material]);
  
      res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getCantidadByNombreMaterial: (req, res) => {
    const { Nombre_material } = req.body;

    if (!Nombre_material) {
        return res.status(400).json({ error: 'Nombre_material is required in the request body' });
    }

    Stock.getCantidadByNombreMaterial(Nombre_material, (err, stock) => {
        if (err) {
            console.error('Error fetching stock:', err);
            res.status(500).json({ error: 'Error fetching stock' });
            return;
        }

        if (!stock) {
            res.status(404).json({ error: `No stock found with Nombre_material '${Nombre_material}'` });
        } else {
            res.json(stock);
        }
    });
},
deleteStock: (req, res) => {
  const { id } = req.params;

  // Obtener el stock técnico a eliminar para obtener la cantidad
  Stocktechnique.getByStockTecnicoId(id, (err, stock) => {
    if (err) {
      console.error('Error al obtener stock técnico:', err);
      return res.status(500).json({ error: 'Error interno al obtener stock técnico' });
    }

    if (!stock) {
      return res.status(404).json({ error: 'Stock técnico no encontrado' });
    }

    const { Nombre_material, Cantidad } = stock;

    // Restar la cantidad del material eliminado en stocktecnico de stocksistema
    Stock.updateStockByMaterial(Nombre_material, -Cantidad, (err) => {
      if (err) {
        console.error('Error al actualizar stocksistema:', err);
        return res.status(500).json({ error: 'Error interno al actualizar stocksistema' });
      }

      // Una vez actualizado stocksistema, eliminar el registro en stocktecnico
      Stocktechnique.deleteTechnique(id, (err) => {
        if (err) {
          console.error('Error al eliminar stock técnico:', err);
          return res.status(500).json({ error: 'Error interno al eliminar stock técnico' });
        }
        res.status(200).json({ message: 'Stock técnico eliminado correctamente' });
      });
    });
  });
},
};




module.exports = StockController;
