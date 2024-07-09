const db = require('../../config/db');

const Stocktechnique = {
  getByNombreMaterialAndTecnico: (Nombre_material, Nombre_tecnico, callback) => {
    const query = 'SELECT * FROM stocktecnico WHERE Nombre_material = ? AND Nombre_tecnico = ?';
    db.query(query, [Nombre_material, Nombre_tecnico], (err, result) => {
      if (err) {
        console.error('Error al obtener técnica por nombre de material y técnico:', err);
        return callback(err, null);
      }
      if (result.length > 0) {
        // Si se encontraron resultados, devolver el primer resultado encontrado
        return callback(null, result[0]);
      } else {
        // Si no se encontraron resultados, devolver null
        return callback(null, null);
      }
    });
  },
  getAllTechniques: (callback) => {
    const query = 'SELECT * FROM stocktecnico';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  addTechnique: (Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion, callback) => {
    const query = 'INSERT INTO stocktecnico (Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion) VALUES (?, ?, ?, ?)';
    db.query(query, [Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  deleteTechnique: (id, callback) => {
    const query = 'DELETE FROM stocktecnico WHERE Id_tecnico = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  updateTechnique: (id, Nombre_material, Cantidad, Fecha_modificacion, callback) => {
    const query = `UPDATE stocktecnico SET Nombre_material = ?, Cantidad = ?, Fecha_modificacion = ? WHERE Id_stocktecnico = ?`;
    db.query(query, [Nombre_material, Cantidad, Fecha_modificacion, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar técnica en la base de datos:', err);
        return callback(err);
      }
      callback(null); // Llama al callback sin error si la actualización fue exitosa
    });
  },

// Modifica la función getCantidadStockTechnique en Stocktechnique.js

getCantidadStockTechnique: (Nombre_material, Nombre_tecnico, callback) => {
  const query = 'SELECT Cantidad FROM stocktecnico WHERE Nombre_material = ? AND Nombre_tecnico = ?';
  // Pasa [Nombre_material, Nombre_tecnico] como un solo arreglo de parámetros
  db.query(query, [Nombre_material, Nombre_tecnico], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (results.length === 0) {
      callback(null, null); // No se encontró ningún stock con ese Nombre_material y Nombre_tecnico
    } else {
      callback(null, results[0].Cantidad);
    }
  });
},


};


module.exports = Stocktechnique;
