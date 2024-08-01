const db = require('../../config/connection');

const Stock = {
  getAllStocks: (callback) => {
    const query = 'SELECT * FROM facturas';

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      const stocks = results.map(row => ({
        Id_factura: row.Id_factura,
        Nombre_factura: row.Nombre_factura,
        Valor_factura: row.Valor_factura,
        Fecha_factura: row.Fecha_factura,
      }));

      callback(null, stocks);
    });
  },

  addStocks: (Nombre_factura, Valor_factura, Fecha_factura, callback) => {
    if (!Nombre_factura || !Valor_factura || !Fecha_factura) {
      return callback('Faltan campos requeridos', null);
    }

    const query = 'INSERT INTO facturas(Nombre_factura, Valor_factura, Fecha_factura) VALUES (?, ?, ?)';
    db.query(query, [Nombre_factura, Valor_factura, Fecha_factura], (err, result) => {
      if (err) {
        console.error('Error al insertar factura:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Factura agregado correctamente', insertId: result.insertId });
    });
  },
}

module.exports = Stock;
