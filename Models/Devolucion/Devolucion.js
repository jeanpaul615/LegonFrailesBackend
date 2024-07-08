// models/Devoluciones.js
const connection = require('../../config/db');

class Devolucion {
  static getAll(callback) {
    const sql = 'SELECT * FROM devolucion'; // Reemplaza `tabla_devoluciones` por el nombre de tu tabla
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = Devolucion;
