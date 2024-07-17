const connection = require('../../config/db');

class Contrato {
  static getAll(callback) {
    const sql = 'SELECT * FROM contratos';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static addContrato(Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha, callback) {
    const query = 'INSERT INTO contratos(Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha], (err, result) => {
      if (err) {
        console.error('Error al insertar contrato:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Contrato agregado correctamente', insertId: result.insertId });
    });
  }

  static updateContratoById = ({Id_contrato, Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha }) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE contratos SET Nombre_contrato = ?, Nombre_tecnico = ?, Nombre_material = ?, Cantidad = ?, Fecha = ? WHERE Id_contrato = ?';
      connection.query(query, [Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha, Id_contrato], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = Contrato;
