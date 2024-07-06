const db = require('../../config/db');

const TechniqueController = {
  getAllTechniques: (callback) => {
    const query = 'SELECT * FROM stocktecnico';

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      // Mapear resultados si es necesario
      const techniques = results.map(row => ({
        id: row.Id_stocktecnico,
        cedula: row.Cedula,
        nombreTecnico: row.Nombre_tecnico,
        nombreMaterial: row.Nombre_material,
        cantidad: row.Cantidad,
        fechaModificacion: row.Fecha_modificacion
      }));

      callback(null, techniques);
    });
  },

  addTechnique: (cedula, nombreTecnico, nombreMaterial, cantidad, fechaModificacion, callback) => {
    if (!cedula || !nombreTecnico || !nombreMaterial || !cantidad || !fechaModificacion) {
      return callback('Faltan campos requeridos', null);
    }

    const query = 'INSERT INTO stocktecnico(Cedula, Nombre_tecnico, Nombre_material, Cantidad, Fecha_modificacion) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [cedula, nombreTecnico, nombreMaterial, cantidad, fechaModificacion], (err, result) => {
      if (err) {
        console.error('Error al insertar técnica:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Técnica agregada correctamente', insertId: result.insertId });
    });
  },

  deleteTechnique: (id, callback) => {
    const query = 'DELETE FROM stocktecnico WHERE Id_stocktecnico = ?';
    db.query(query, [id], callback);
  },

  updateTechnique: (id, nombreMaterial, cantidad, fechaModificacion, callback) => {
    const query = 'UPDATE stocktecnico SET Nombre_material = ?, Cantidad = ?, Fecha_modificacion = ? WHERE Id_stocktecnico = ?';
    db.query(query, [nombreMaterial, cantidad, fechaModificacion, id], callback);
  }
};

module.exports = TechniqueController;
