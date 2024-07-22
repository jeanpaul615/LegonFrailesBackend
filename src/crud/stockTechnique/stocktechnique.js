const db = require('../../config/connection');

const StockTechnique = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM stocktecnico';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener técnicas:', err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  addTechnique: (Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion, callback) => {
    const sql = 'INSERT INTO stocktecnico (Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion) VALUES (?, ?, ?, ?)';
    db.query(sql, [Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion], (err, result) => {
      if (err) {
        console.error('Error al agregar técnica nueva:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  deleteTechnique: (id, callback) => {
    const sql = 'DELETE FROM stocktecnico WHERE Id_stocktecnico = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar técnica:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  updateTechnique: (Id_stocktecnico, Nombre_material, Nombre_tecnico, Cantidad, Fecha_modificacion, callback) => {
    const sql = 'UPDATE stocktecnico SET Nombre_material = ?, Nombre_tecnico = ?, Cantidad = ?, Fecha_modificacion = ? WHERE Id_stocktecnico = ?';
    db.query(sql, [Nombre_material, Nombre_tecnico, Cantidad, Fecha_modificacion, Id_stocktecnico], (err, result) => {
      if (err) {
        console.error('Error al actualizar técnica:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  getCantidadStockTechnique: (Nombre_material, Nombre_tecnico, callback) => {
    const sql = 'SELECT Cantidad FROM stocktecnico WHERE Nombre_material = ? AND Nombre_tecnico = ?';
    db.query(sql, [Nombre_material, Nombre_tecnico], (err, result) => {
      if (err) {
        console.error('Error al obtener cantidad:', err);
        callback(err, null);
      } else {
        callback(null, result.length ? result[0].Cantidad : null);
      }
    });
  },

  updateCantidadStockTechnique: (Nombre_material, Nombre_tecnico, Cantidad, callback) => {
    const sql = 'UPDATE stocktecnico SET Cantidad = Cantidad - ? WHERE Nombre_material = ? AND Nombre_tecnico = ?';
    db.query(sql, [Cantidad, Nombre_material, Nombre_tecnico], (err, result) => {
      if (err) {
        console.error('Error al actualizar cantidad de stock:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  getMaterialsByTecnico: (Nombre_tecnico, callback) => {
    const sql = 'SELECT Nombre_material FROM stocktecnico WHERE Nombre_tecnico = ?';
    db.query(sql, [Nombre_tecnico], (err, results) => {
      if (err) {
        console.error('Error al obtener materiales por técnico:', err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getAllTecnicos: (callback) => {
    const sql = 'SELECT DISTINCT Nombre_tecnico FROM stocktecnico';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener todos los técnicos:', err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getCantidadByTecnicoAndMaterial: (Nombre_tecnico, Nombre_material, callback) => {
    const sql = 'SELECT Cantidad FROM stocktecnico WHERE Nombre_tecnico = ? AND Nombre_material = ?';
    db.query(sql, [Nombre_tecnico, Nombre_material], (err, result) => {
      if (err) {
        console.error('Error al obtener cantidad por técnico y material:', err);
        callback(err, null);
      } else {
        callback(null, result.length ? result[0].Cantidad : null);
      }
    });
  },

  getByNombreMaterialAndTecnico: (Nombre_material, Nombre_tecnico, callback) => {
    const sql = 'SELECT * FROM stocktecnico WHERE Nombre_material = ? AND Nombre_tecnico = ?';
    db.query(sql, [Nombre_material, Nombre_tecnico], (err, results) => {
      if (err) {
        console.error('Error al verificar existencia de la técnica:', err);
        callback(err, null);
      } else {
        callback(null, results.length ? results[0] : null);
      }
    });
  },
};

module.exports = StockTechnique;
