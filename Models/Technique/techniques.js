const db = require('../../config/db');

const Tecnico = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tecnicos', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tecnicos WHERE Id_tecnico = ?', id, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  },

  addTechnician: (technicianData, callback) => {
    const query = `INSERT INTO tecnicos (Cedula, Nombre, Telefonos, Fecha_licencia, Vencimiento_licencia, Cargo, Estado, Fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [
      technicianData.Cedula,
      technicianData.Nombre,
      technicianData.Telefonos,
      technicianData.Fecha_licencia,
      technicianData.Vencimiento_licencia,
      technicianData.Cargo,
      technicianData.Estado,
      technicianData.Fecha_creacion
    ], (err, result) => {
      if (err) {
        console.error('Error al insertar técnico:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Técnico agregado correctamente', insertId: result.insertId });
    });
  },

  update: (id, updatedTecnico) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE tecnicos SET ? WHERE Id_tecnico = ?', [updatedTecnico, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Tecnico updated' });
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tecnicos WHERE Id_tecnico = ?', id, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Tecnico deleted' });
      });
    });
  }
};

module.exports = Tecnico;
