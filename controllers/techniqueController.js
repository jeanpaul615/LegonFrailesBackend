// controllers/tecnicoController.js
const Tecnico = require('..//Models/Technique/techniques'); // Corregido el path del require

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

// controllers/tecnicoController.js
exports.createTecnico = (req, res) => {
  const {
    Cedula,
    Nombre,
    Telefonos,
    Fecha_licencia,
    Vencimiento_licencia,
    Cargo,
    Estado
  } = req.body;

  // Verificar que el campo Nombre no esté vacío o nulo
  if (!Nombre) {
    return res.status(400).json({ error: "Nombre is required" });
  }

  Tecnico.create({
    Cedula,
    Nombre,
    Telefonos,
    Fecha_licencia,
    Vencimiento_licencia,
    Cargo,
    Estado,
    Fecha_creacion: new Date()
  })
    .then(result => {
      res.status(201).json({ message: 'Tecnico created', id: result.insertId });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};


exports.updateTecnico = (req, res) => {
  const { id } = req.params;
  const updatedTecnico = req.body;

  Tecnico.update(id, updatedTecnico)
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
