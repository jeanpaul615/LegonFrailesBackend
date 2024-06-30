const Stock = require('../crud/Auth/Stock'); // Ajusta la ruta según sea necesario

exports.getAllStocks = (req, res) => {
  Stock.getAllStocks((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.status(200).json(data);
    }
  });
};
