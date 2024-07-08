const db = require('../../config/db');

const Stock = {
  getAllStocks: (callback) => {
    const query = 'SELECT * FROM stocksistema';

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

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
      return callback('Faltan campos requeridos', null);
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

  updateStockByMaterial: (Nombre_material, Cantidad, callback) => {
    const query = 'UPDATE stocksistema SET Cantidad = ? WHERE Nombre_material = ?';
    db.query(query, [Cantidad, Nombre_material], (err, result) => {
      if (err) {
        console.error('Error al actualizar stock:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Stock actualizado correctamente' });
    });
  },

  updateStockByDevolucion: (Nombre_material, Cantidad, callback) => {
    const query = 'UPDATE stocksistema SET Cantidad = ? WHERE Nombre_material = ?';
    db.query(query, [Cantidad, Nombre_material], (err, result) => {
      if (err) {
        console.error('Error al actualizar stock:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Stock actualizado correctamente' });
    });
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

module.exports = Stock;
