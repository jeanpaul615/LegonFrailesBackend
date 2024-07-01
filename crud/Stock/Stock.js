// Stock.js (controlador)
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
  },

  addStocks: (Nombre_material, Cantidad, Estado, callback) => {
    if (!Nombre_material || !Cantidad || !Estado) {
      return('Faltan campos requeridos');
    }

    const query = 'INSERT INTO stocksistema(Nombre_material, Cantidad, Estado) VALUES (?, ?, ?)';
    db.query(query, [Nombre_material, Cantidad, Estado], (err, result) => {
      if (err) {
        console.error('Error al insertar stock:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Stock agregado correctamente', insertId: result.insertId });
    });
  }
};

module.exports = StockController;
