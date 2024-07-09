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
}

module.exports = Contrato;
