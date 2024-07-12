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
  getAll: (callback) => {
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
updateCantidadStockTechnique: (Nombre_material, Nombre_tecnico, Cantidad, callback) => {
  const query = `UPDATE stocktecnico SET Cantidad = Cantidad - ?, Fecha_modificacion = ? WHERE Nombre_material = ? AND Nombre_tecnico = ?`;
  const Fecha_modificacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
  db.query(query, [Cantidad, Fecha_modificacion, Nombre_material, Nombre_tecnico], (err, result) => {
    if (err) {
      console.error('Error al actualizar la cantidad del stock en la base de datos:', err);
      return callback(err);
    }
    callback(null, result);
  });
},
getMaterialsByTecnico: (Nombre_tecnico, callback) => {
  const query = 'SELECT Nombre_material, Cantidad FROM stocktecnico WHERE Nombre_tecnico = ?';
  db.query(query, [Nombre_tecnico], (err, results) => {
    if (err) {
      console.error('Error al obtener materiales por técnico:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
},
getCantidadByTecnicoAndMaterial: (Nombre_tecnico, Nombre_material, callback) => {
  const query = 'SELECT Cantidad FROM stocktecnico WHERE Nombre_tecnico = ? AND Nombre_material = ?';
  db.query(query, [Nombre_tecnico, Nombre_material], (err, results) => {
    if (err) {
      console.error('Error al obtener cantidad por técnico y material:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // Si no se encuentra ningún resultado
    }
    return callback(null, results[0].Cantidad);
  });
},
getAllTecnicos: (callback) => {
  const query = 'SELECT DISTINCT Nombre_tecnico FROM stocktecnico';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
},


};


module.exports = Stocktechnique;
