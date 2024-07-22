// controllers/tecnicoController.js
const Tecnico = require('../crud/technique/techniques'); 

exports.getAllTecnicos = (req, res) => {
  Tecnico.getAll()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.getTecnicoById = (req, res) => {
  const { id } = req.params;
  Tecnico.getById(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Tecnico not found' });
      }
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.addTechnician = (req, res) => {
  const { Cedula, Nombre, Telefonos, Fecha_licencia, Vencimiento_licencia, Cargo, Estado } = req.body;

  if (!Cedula || !Nombre || !Telefonos || !Fecha_licencia || !Vencimiento_licencia || !Cargo || Estado === undefined) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const technicianData = {
    Cedula,
    Nombre,
    Telefonos,
    Fecha_licencia,
    Vencimiento_licencia,
    Cargo,
    Estado,
    Fecha_creacion: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
  };

  Tecnico.addTechnician(technicianData, (err, result) => {
    if (err) {
      console.error('Error al agregar técnico:', err);
      return res.status(500).json({ error: 'Error interno al agregar técnico' });
    }
    res.status(200).json({ message: 'Técnico agregado correctamente', insertId: result.insertId });
  });
};


exports.updateTecnico = (req, res) => {
  const updatedTecnico = req.body;

  Tecnico.update(updatedTecnico)
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tecnico not found' });
      }
      res.json({ message: 'Tecnico updated' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};



exports.deleteTecnico = (req, res) => {
  const { id } = req.params;

  Tecnico.delete(id)
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tecnico not found' });
      }
      res.json({ message: 'Tecnico deleted' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};
