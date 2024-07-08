// models/Tecnico.js
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

  create: (Cedula, Nombre, Telefonos, Fecha_licencia, Vencimiento_licencia, Cargo, Estado) => {
    const newTecnico = {
      Cedula: Cedula,
      Nombre: Nombre,
      Telefonos: Telefonos,
      Fecha_licencia: Fecha_licencia,
      Vencimiento_licencia: Vencimiento_licencia,
      Cargo: Cargo,
      Estado: Estado,
      Fecha_creacion: new Date()
    };

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO tecnicos SET ?', newTecnico, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Tecnico created', id: results.insertId });
      });
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
