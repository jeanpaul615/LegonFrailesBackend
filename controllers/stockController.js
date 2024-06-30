// stockController.js

const db = require('../config/db'); // Ajusta la ruta según sea necesario
const Stock = require('../crud/Stock/Stock'); // Ajusta la ruta según sea necesario

const StockController = {
  getAllStocks: (req, res) => {
    Stock.getAllStocks((err, data) => {
      if (err) {
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

    // Llama al método de agregar stock en el modelo Stock
    Stock.addStocks({ Nombre_material, Cantidad, Estado }, (err, insertId) => {
      if (err) {
        console.error('Error al insertar stock:', err);
        return res.status(500).json({ error: 'Error interno al agregar stock' });
      }
      res.status(200).json({ message: 'Stock agregado correctamente', insertId });
    });
  },
};

module.exports = StockController;
