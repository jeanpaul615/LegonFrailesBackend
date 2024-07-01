// stockController.js

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

    // Verifica que los datos requeridos no sean nulos
    if (!Nombre_material || !Cantidad || !Estado) {
      return res.status(400).json({ error: 'Los campos Nombre_material, Cantidad y Estado son requeridos.' });
    }

    // Llama al método para agregar stock en el modelo Stock
    Stock.addStocks(Nombre_material, Cantidad, Estado, (err, result) => {
      if (err) {
        console.error('Error al insertar stock:', err);
        return res.status(500).json({ error: 'Error interno al agregar stock' });
      }
      res.status(200).json({ message: 'Stock agregado correctamente', insertId: result.insertId });
    });
  },
};

module.exports = StockController;
