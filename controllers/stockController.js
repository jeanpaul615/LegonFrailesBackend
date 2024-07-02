const Stock = require('../crud/Stock/Stock');

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

  deleteStock: (req, res) => {
    const { id } = req.params;

    Stock.deleteStock(id, (err) => {
      if (err) {
        console.error('Error al eliminar stock:', err);
        return res.status(500).json({ error: 'Error interno al eliminar stock' });
      }
      res.status(200).json({ message: 'Stock eliminado correctamente' });
    });
  },

  updateStock: (req, res) => {
    const { Id_stocksistema } = req.params;
    const { Nombre_material, Cantidad, Estado } = req.body;

    if (!Nombre_material || !Cantidad || !Estado) {
      return res.status(400).json({ error: 'Los campos Nombre_material, Cantidad y Estado son requeridos.' });
    }

    Stock.updateStock(Id_stocksistema, Nombre_material, Cantidad, Estado, (err) => {
      if (err) {
        console.error('Error al actualizar stock:', err);
        return res.status(500).json({ error: 'Error interno al actualizar stock' });
      }
      res.status(200).json({ message: 'Stock actualizado correctamente' });
    });
  }
};

module.exports = StockController;
