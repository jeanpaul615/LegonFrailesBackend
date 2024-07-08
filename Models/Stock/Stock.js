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
  },
  deleteStock: (Id_stocksistema, callback) => {
    const query = 'DELETE FROM stocksistema WHERE Id_stocksistema = ?';
    db.query(query, [Id_stocksistema], callback);
  },

  updateStock: (Id_stocksistema, Nombre_material, Cantidad, Estado, callback) => {
    const query = 'UPDATE stocksistema SET Nombre_material = ?, Cantidad = ?, Estado = ? WHERE Id_stocksistema = ?';
    db.query(query, [Nombre_material, Cantidad, Estado, Id_stocksistema], callback);
  },
  getCantidadByNombreMaterial: (Nombre_material, callback) => {
    const query = 'SELECT Cantidad FROM stocksistema WHERE Nombre_material = ?';
    db.query(query, [Nombre_material], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (results.length === 0) {
            callback(null, null); // No se encontró ningún stock con ese Nombre_material
        } else {
            callback(null, results[0].Cantidad);
        }
    });
},
};

module.exports = StockController;
