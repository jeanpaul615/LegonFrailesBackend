const connection = require('../../config/db');

class Devolucion {
  static getAll(callback) {
    const sql = 'SELECT * FROM devolucion';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static create(data, callback) {
    const sql = 'INSERT INTO devolucion (Nombre_material, Cantidad, Estado, Fecha) VALUES (?, ?, ?, NOW())'; // Added missing placeholders for Estado
    connection.query(sql, [data.Nombre_material, data.Cantidad, data.Estado], (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static update(data, callback) {
    const sql = 'UPDATE devolucion SET Nombre_material = ?, Cantidad = ?, Estado = ?, Fecha = ? WHERE Id_devolucion = ?'; // Added missing placeholders for Estado
    connection.query(sql, [data.Nombre_material, data.Cantidad, data.Estado, data.Fecha, data.Id_devolucion], (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = Devolucion;
