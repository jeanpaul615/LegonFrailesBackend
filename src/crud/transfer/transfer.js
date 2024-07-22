const db = require('../../config/connection');

const Traslado = {
  getAll: (callback) => {
    db.query('SELECT * FROM traslados', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  add: (trasladoData, callback) => {
    db.query('INSERT INTO traslados SET ?', trasladoData, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  update: (updatedTraslado) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE traslados 
        SET Nombre_material = ?, Cantidad = ?, Fecha = CURRENT_TIMESTAMP 
        WHERE Id_traslado = ?
      `;
      const { Id_traslado, Nombre_material, Cantidad } = updatedTraslado;
      db.query(query, [Nombre_material, Cantidad, Id_traslado], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Traslado updated', affectedRows: results.affectedRows });
      });
    });
  },

  
};

module.exports = Traslado;
