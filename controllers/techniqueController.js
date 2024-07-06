const db = require('../config/db');

const TechniqueController = {
  getAllTechniques: (callback) => {
    const query = 'SELECT * FROM tecnicos';

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      const technicians = results.map(row => ({
        id: row.Id_tecnico,
        cedula: row.Cedula,
        nombres: row.Nombres,
        apellidos: row.Apellidos,
        telefonos: row.Telefonos,
        fechaLicencia: row.Fecha_licencia,
        vencimientoLicencia: row.Vencimiento_licencia,
        cargo: row.Cargo,
        estado: row.Estado,
        fechaCreacion: row.Fecha_creacion,
        fechaModificacion: row.Fecha_modificacion
      }));

      callback(null, technicians);
    });
  },

  addTechnique: (technicianData, callback) => {
    const {
      cedula,
      nombres,
      apellidos,
      telefonos,
      fechaLicencia,
      vencimientoLicencia,
      cargo,
      estado,
      fechaCreacion,
      fechaModificacion
    } = technicianData;

    const query = 'INSERT INTO tecnicos (Cedula, Nombres, Apellidos, Telefonos, Fecha_licencia, Vencimiento_licencia, Cargo, Estado, Fecha_creacion, Fecha_modificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [cedula, nombres, apellidos, telefonos, fechaLicencia, vencimientoLicencia, cargo, estado, fechaCreacion, fechaModificacion], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { message: 'Técnico agregado correctamente', insertId: result.insertId });
    });
  },

  deleteTechnique: (technicianId, callback) => {
    const query = 'DELETE FROM tecnicos WHERE Id_tecnico = ?';
    db.query(query, [technicianId], callback);
  },

  updateTechnique: (technicianData, callback) => {
    const {
      id,
      cedula,
      nombres,
      apellidos,
      telefonos,
      fechaLicencia,
      vencimientoLicencia,
      cargo,
      estado,
      fechaModificacion
    } = technicianData;

    const query = 'UPDATE tecnicos SET Cedula = ?, Nombres = ?, Apellidos = ?, Telefonos = ?, Fecha_licencia = ?, Vencimiento_licencia = ?, Cargo = ?, Estado = ?, Fecha_modificacion = ? WHERE Id_tecnico = ?';
    db.query(query, [cedula, nombres, apellidos, telefonos, fechaLicencia, vencimientoLicencia, cargo, estado, fechaModificacion, id], callback);
  }
};

module.exports = TechniqueController;
