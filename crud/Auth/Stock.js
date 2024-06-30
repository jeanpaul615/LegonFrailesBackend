// controllers/StockController.js

const db = require('../../config/db');

const StockController = {
  getAllStocks: (callback) => {
    const query = 'SELECT * FROM stocksistema';

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      // Mapear resultados si es necesario
      const stocks = results.map(row => ({
        Id_stocksistema: row.Id_stocksistema,
        Nombre_material: row.Nombre_material,
        Cantidad: row.Cantidad,
        Estado: row.Estado
      }));

      callback(null, stocks);
    });
  }
};

module.exports = StockController;
