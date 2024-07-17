const db = require('../../config/db');

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
  }

  
};

module.exports = Traslado;
